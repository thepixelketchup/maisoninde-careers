// Vercel serverless function.
// Receives an application, builds a PDF of the answers, and emails the team
// the PDF + the applicant's CV (and sends the applicant a copy).
//
// Env vars (see .env.example):
//   RESEND_API_KEY, MAIL_FROM, NOTIFY_TO_NL, NOTIFY_TO_IN (or NOTIFY_TO), SEND_CONFIRMATION

const Busboy = require("busboy");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const MAX_FILE = 4 * 1024 * 1024;

function parse(req) {
  return new Promise((resolve, reject) => {
    const fields = {};
    let file = null, tooBig = false;
    const bb = Busboy({ headers: req.headers, limits: { fileSize: MAX_FILE, files: 1, fields: 10 } });
    bb.on("field", (k, v) => { fields[k] = String(v).slice(0, 60000); });
    bb.on("file", (name, stream, info) => {
      const chunks = [];
      stream.on("data", (c) => chunks.push(c));
      stream.on("limit", () => { tooBig = true; });
      stream.on("end", () => { if (chunks.length) file = { buffer: Buffer.concat(chunks), filename: info.filename, mime: info.mimeType }; });
    });
    bb.on("close", () => (tooBig ? reject(Object.assign(new Error("The PDF must be under 4 MB."), { status: 400 })) : resolve({ fields, file })));
    bb.on("error", reject);
    req.pipe(bb);
  });
}

// Standard PDF fonts only support WinAnsi: transliterate anything else.
const ansi = (s) => String(s).normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[–—]/g, "-").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[^\x20-\x7E\xA0-\xFF\n]/g, "?");
const esc = (s = "") => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

async function buildPdf({ title, subtitle, answers }) {
  const pdf = await PDFDocument.create();
  const reg = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const W = 595, H = 842, M = 54, TW = W - 2 * M;
  const brown = rgb(0.22, 0.10, 0.07), terra = rgb(0.776, 0.325, 0.173), grey = rgb(0.4, 0.38, 0.37);
  let page = pdf.addPage([W, H]);
  let y = H - M;

  const wrap = (text, font, size, width) => {
    const out = [];
    for (const para of ansi(text).split("\n")) {
      let line = "";
      for (const word of para.split(/\s+/)) {
        const t = line ? line + " " + word : word;
        if (font.widthOfTextAtSize(t, size) <= width) line = t;
        else {
          if (line) out.push(line);
          let w = word;
          while (font.widthOfTextAtSize(w, size) > width) { // break very long tokens (urls)
            let i = w.length; while (i > 1 && font.widthOfTextAtSize(w.slice(0, i), size) > width) i--;
            out.push(w.slice(0, i)); w = w.slice(i);
          }
          line = w;
        }
      }
      out.push(line);
    }
    return out;
  };
  const need = (h) => { if (y - h < M) { page = pdf.addPage([W, H]); y = H - M; } };
  const text = (t, font, size, color, lead) => {
    for (const l of wrap(t, font, size, TW)) { need(lead); page.drawText(l, { x: M, y: y - size, size, font, color }); y -= lead; }
  };

  text("MAISON INDE", bold, 11, terra, 16);
  y -= 4;
  text(title, bold, 20, brown, 26);
  text(subtitle, reg, 10.5, grey, 15);
  y -= 6; page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.7, color: terra }); y -= 18;

  for (const a of answers) {
    need(40);
    text(a.label.toUpperCase(), bold, 8, grey, 12);
    text(a.value, reg, 11, rgb(0.07, 0.07, 0.07), 15);
    y -= 8;
  }
  return Buffer.from(await pdf.save());
}

async function sendMail(payload) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error("Resend: " + r.status + " " + (await r.text()));
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  try {
    const { fields, file } = await parse(req);
    if (fields.website) return res.status(200).json({ ok: true }); // honeypot

    const loc = fields.location === "in" ? "in" : "nl";
    const locName = loc === "in" ? "India" : "Netherlands";
    let answers;
    try { answers = JSON.parse(fields.answers || "[]"); } catch { answers = []; }
    answers = answers.filter((a) => a && a.label && a.value).slice(0, 60).map((a) => ({ label: String(a.label).slice(0, 200), value: String(a.value).slice(0, 5000) }));
    const get = (n) => (answers.find((a) => a.label.toLowerCase().startsWith(n)) || {}).value || "";
    const name = get("full name"), email = get("email"), track = get("which track");

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: "Please complete name and email." });
    if (!file || !(file.mime === "application/pdf" || /\.pdf$/i.test(file.filename || "")) || file.buffer.slice(0, 4).toString() !== "%PDF")
      return res.status(400).json({ error: "Please attach your CV as a PDF." });

    const to = (process.env["NOTIFY_TO_" + loc.toUpperCase()] || process.env.NOTIFY_TO || "").split(",").map((s) => s.trim()).filter(Boolean);
    if (!process.env.RESEND_API_KEY || !to.length) { console.error("Missing RESEND_API_KEY / NOTIFY_TO"); return res.status(500).json({ error: "The form is not configured yet." }); }

    const safe = name.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "applicant";
    const when = new Date().toISOString().slice(0, 16).replace("T", " ") + " UTC";
    const pdf = await buildPdf({ title: `${name}`, subtitle: `${locName} application · ${track} · ${when}`, answers });
    const attachments = [
      { filename: `Application-${safe}.pdf`, content: pdf.toString("base64") },
      { filename: `CV-${safe}.pdf`, content: file.buffer.toString("base64") },
    ];
    const from = process.env.MAIL_FROM || "Maison Inde Careers <careers@maisoninde.com>";

    const rows = answers.slice(0, 8).map((a) => `<tr><td style="padding:2px 12px 2px 0;color:#888">${esc(a.label)}</td><td>${esc(a.value).slice(0, 200)}</td></tr>`).join("");
    await sendMail({
      from, to, reply_to: email, attachments,
      subject: `[${locName}] New application: ${track || "Application"} · ${name}`,
      html: `<p><b>${esc(name)}</b> applied for <b>${esc(track)}</b> (${locName}).</p><table style="font-size:13px">${rows}</table><p>Full responses (PDF) and CV are attached. Reply to this email to answer the applicant.</p>`,
    });

    if (process.env.SEND_CONFIRMATION !== "false") {
      try {
        await sendMail({
          from, to: [email], attachments: [attachments[0]],
          subject: "We received your application | Maison Indē",
          html: `<p>Hi ${esc(name.split(" ")[0])},</p><p>Thank you for applying to Maison Indē. Your application for <b>${esc(track)}</b> is with our team, and a copy is attached. We will reach out if there is a fit.</p><p>Warmly,<br>Team Maison Indē</p>`,
        });
      } catch (e) { console.error("confirmation failed", e.message); } // never fail the application over this
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(err.status || 500).json({ error: err.status ? err.message : "We couldn’t submit your application." });
  }
};

module.exports.buildPdf = buildPdf;
