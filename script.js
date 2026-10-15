(function () {
  var C = window.CAREERS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var form = $("#appForm");
  var loc = "nl";
  var trackId = "";

  /* ---------- location + routing ---------- */
  function detect() {
    try {
      var saved = localStorage.getItem("mi-loc");
      if (saved === "in" || saved === "nl") return saved;
    } catch (e) {}
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      if (/Kolkata|Calcutta/.test(tz)) return "in";
    } catch (e) {}
    return "nl";
  }

  function setLoc(l) {
    loc = l;
    document.body.dataset.loc = l;
    try { localStorage.setItem("mi-loc", l); } catch (e) {}
  }

  // Routes: #/  ·  #/role/<loc>/<id>  ·  #/apply/<loc>/<id>
  function route() {
    var p = (location.hash || "#/").replace(/^#\/?/, "").split("/");
    var view = "home";
    if ((p[0] === "role" || p[0] === "apply") && (p[1] === "nl" || p[1] === "in")) {
      setLoc(p[1]);
      trackId = p[2] || "";
      if (track()) view = p[0]; else { trackId = ""; }
    }
    document.body.dataset.view = view;
    document.querySelectorAll(".view").forEach(function (v) { v.hidden = v.id !== "view-" + view; });
    if (view === "home") renderHome();
    if (view === "role") renderRole();
    if (view === "apply") { renderApply(); renderForm(); }
    window.scrollTo(0, 0);
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-set-loc]");
    if (!b) return;
    setLoc(b.dataset.setLoc);
    if (location.hash && location.hash !== "#/") location.hash = "#/"; else route();
    if (b.closest(".choose")) $("#roles").scrollIntoView({ behavior: "smooth" });
  });

  /* ---------- images ---------- */
  $("#heroImg").src = C.images.hero;
  document.querySelectorAll(".js-img").forEach(function (i) { i.src = C.images[i.dataset.k]; i.loading = "lazy"; });

  /* ---------- helpers ---------- */
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function track() { return C[loc].tracks.filter(function (t) { return t.id === trackId; })[0]; }
  function factsHTML(d) { return d.facts.map(function (f) { return "<div><span>" + esc(f[0]) + "</span><b>" + esc(f[1]) + "</b></div>"; }).join(""); }

  /* ---------- 1. list ---------- */
  function renderHome() {
    var d = C[loc];
    $("#facts").innerHTML = factsHTML(d);
    $("#rolesKicker").textContent = loc === "nl" ? "Step inside · Internships in Amsterdam" : "Step inside · Open roles in India";
    $("#rolesTitle").textContent = loc === "nl" ? "Find your room in the house" : "Find your room in the house";
    $("#rolesIntro").textContent = loc === "nl"
      ? "Internships across the AMFI tracks. A great fit for students passionate about slow fashion and authentic artisanal craft."
      : "Open to NIFT students and non-NIFT candidates. Internships, graduation projects, part-time and full-time roles.";
    $("#roleList").innerHTML = d.tracks.map(function (t) {
      return '<a class="role-row" href="#/role/' + loc + "/" + t.id + '"><div><span class="tag">' + esc(t.tag) + "</span><h3>" + esc(t.name) +
        "</h3><p>" + esc(t.line) + '</p></div><span class="go">View role <i>→</i></span></a>';
    }).join("");
  }

  /* ---------- 2. role detail ---------- */
  function renderRole() {
    var d = C[loc], t = track();
    var li = function (arr) { return arr.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join(""); };
    $("#dTag").textContent = d.name + " · " + t.tag;
    $("#dTitle").textContent = t.name;
    $("#dAbout").textContent = t.about || t.line;
    $("#dDoes").innerHTML = li(t.does);
    $("#dTraits").innerHTML = li(t.traits || [t.fit]);
    $("#dSkills").innerHTML = t.strengths.map(function (x) { return "<span>" + esc(x) + "</span>"; }).join("");
    $("#dOffer").innerHTML = li(d.offer);
    $("#dFacts").innerHTML = d.facts.concat(d.details || []).map(function (f) { return "<dt>" + esc(f[0]) + "</dt><dd>" + esc(f[1]) + "</dd>"; }).join("");
    var href = "#/apply/" + loc + "/" + t.id;
    $("#dApply").href = href; $("#dApply2").href = href;
    document.title = t.name + " | Careers at Maison Indē";
  }

  /* ---------- 3. apply ---------- */
  function renderApply() {
    var d = C[loc], t = track();
    $("#aKicker").textContent = d.name + " · " + t.tag;
    $("#aTitle").textContent = "Apply: " + t.name;
    $("#aBack").href = "#/role/" + loc + "/" + t.id;
    document.title = "Apply: " + t.name + " | Maison Indē";
  }

  /* ---------- form builder ---------- */
  function fieldHTML(f) {
    var id = "f_" + f.name;
    var req = f.required ? ' <span class="req">*</span>' : "";
    var hint = f.hint ? '<p class="hint">' + esc(f.hint) + "</p>" : "";
    var err = '<p class="err"></p>';
    var attrs = (f.required ? " required" : "") + (f.autocomplete ? ' autocomplete="' + f.autocomplete + '"' : "") + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "");
    var control;
    if (f.type === "select" || f.type === "track") {
      var opts = f.type === "track" ? C[loc].tracks.map(function (t) { return [t.id, t.name + " · " + t.line]; }) : f.options.map(function (o) { return [o, o]; });
      control = '<select id="' + id + '" name="' + f.name + '"' + attrs + '><option value="">Select…</option>' +
        opts.map(function (o) { return '<option value="' + esc(o[0]) + '"' + (f.type === "track" && o[0] === trackId ? " selected" : "") + ">" + esc(o[1]) + "</option>"; }).join("") + "</select>";
    } else if (f.type === "textarea") {
      control = '<textarea id="' + id + '" name="' + f.name + '"' + attrs + "></textarea>";
    } else if (f.type === "checks") {
      control = '<div class="chips" data-group="' + f.name + '">' + f.options.map(function (o) {
        return '<label><input type="checkbox" name="' + f.name + '" value="' + esc(o) + '">' + esc(o) + "</label>";
      }).join("") + (f.other ? '<input class="other-in" type="text" name="' + f.name + '_other" placeholder="Other (type here)">' : "") + "</div>";
      return '<div class="fld" data-name="' + f.name + '" data-type="checks" data-req="' + (f.required ? 1 : 0) + '"><span class="lbl">' + esc(f.label) + req + "</span>" + control + hint + err + "</div>";
    } else if (f.type === "file") {
      control = '<input id="' + id + '" name="' + f.name + '" type="file" accept="application/pdf,.pdf"' + attrs + ">";
    } else {
      control = '<input id="' + id + '" name="' + f.name + '" type="' + f.type + '"' + attrs + (f.pattern ? ' data-pattern="' + esc(f.pattern) + '" data-pmsg="' + esc(f.patternMsg) + '"' : "") + ">";
    }
    return '<div class="fld" data-name="' + f.name + '"><label for="' + id + '">' + esc(f.label) + req + "</label>" + control + hint + err + "</div>";
  }

  function groupHTML(g) {
    var half = g.fields.length > 3 && g.title === "About you";
    return "<fieldset><legend>" + esc(g.title) + "</legend>" +
      (half ? '<div class="two">' + g.fields.map(fieldHTML).join("") + "</div>" : g.fields.map(fieldHTML).join("")) + "</fieldset>";
  }

  function trackFieldsHTML() {
    var t = track();
    if (!t) return "";
    var out = "";
    C[loc].trackFields.forEach(function (f) {
      if (f.onlyTracks && f.onlyTracks.indexOf(t.id) < 0) return;
      var g = Object.assign({}, f);
      if (f.fromTrack) { if (!t[f.fromTrack]) return; g.options = t[f.fromTrack]; }
      if (f.name === "strengths") g.options = t.strengths;
      out += fieldHTML(g);
    });
    return '<fieldset><legend>' + esc(t.name) + "</legend>" + out + "</fieldset>";
  }

  function renderForm() {
    var d = C[loc];
    form.innerHTML =
      d.form.map(groupHTML).join("") +
      '<div id="trackFields">' + trackFieldsHTML() + "</div>" +
      d.work.map(groupHTML).join("") +
      '<div class="hp"><label>Leave this empty<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="consent"><input type="checkbox" id="consent"><span>I agree that Maison Indē may store and use my details to review my application, and keep them for up to 12 months. <span class="req">*</span></span></label>' +
      '<div id="status" role="status" aria-live="polite"></div>' +
      '<div><button class="btn" type="submit" id="submitBtn">Submit application</button></div>';
  }

  form.addEventListener("change", function (e) {
    if (e.target.id === "f_track") {
      trackId = e.target.value;
      $("#trackFields").innerHTML = trackFieldsHTML();
    }
  });

  function renderAll() { route(); }

  /* ---------- validation + submit ---------- */
  function bad(fld, msg) { fld.classList.add("bad"); $(".err", fld).textContent = msg; }

  function collect() {
    var answers = [], ok = true, first = null;
    form.querySelectorAll(".fld").forEach(function (fld) {
      fld.classList.remove("bad");
      var name = fld.dataset.name;
      var label = ($("label", fld) || $(".lbl", fld)).textContent.replace(/\s*\*\s*$/, "").trim();
      var value = "", required;
      if (fld.dataset.type === "checks") {
        required = fld.dataset.req === "1";
        var vals = Array.prototype.map.call(fld.querySelectorAll("input[type=checkbox]:checked"), function (i) { return i.value; });
        var oth = $(".other-in", fld);
        if (oth && oth.value.trim()) vals.push("Other: " + oth.value.trim());
        value = vals.join(", ");
        if (required && !value) { bad(fld, "Please choose at least one."); ok = false; first = first || fld; }
      } else {
        var inp = $("input,select,textarea", fld);
        if (inp.type === "file") return;
        required = inp.required;
        value = inp.value.trim();
        if (inp.name === "track" && value) { var t = C[loc].tracks.filter(function (x) { return x.id === value; })[0]; value = t.name; }
        if (required && !value) { bad(fld, "This field is required."); ok = false; first = first || fld; }
        else if (value && inp.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) { bad(fld, "Please enter a valid email."); ok = false; first = first || fld; }
        else if (value && inp.type === "url" && !/^https?:\/\/\S+\.\S+/i.test(value)) { bad(fld, "Please paste a full link starting with https://"); ok = false; first = first || fld; }
        else if (value && inp.dataset.pattern && !new RegExp(inp.dataset.pattern).test(value)) { bad(fld, inp.dataset.pmsg); ok = false; first = first || fld; }
      }
      if (value) answers.push({ name: name, label: label, value: value });
    });
    var cvFld = form.querySelector('[data-name="cv"]');
    var file = form.cv && form.cv.files[0];
    if (!file) { bad(cvFld, "Please attach your CV as a PDF."); ok = false; first = first || cvFld; }
    else if (file.type !== "application/pdf" && !/\.pdf$/i.test(file.name)) { bad(cvFld, "The file must be a PDF."); ok = false; first = first || cvFld; }
    else if (file.size > 4 * 1024 * 1024) { bad(cvFld, "The PDF must be under 4 MB."); ok = false; first = first || cvFld; }
    return { ok: ok, first: first, answers: answers, file: file };
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var st = $("#status"); st.className = ""; st.textContent = "";
    var r = collect();
    if (!r.ok) { r.first.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    if (!$("#consent").checked) { st.className = "error"; st.textContent = "Please accept the privacy consent to continue."; return; }

    var fd = new FormData();
    fd.append("location", loc);
    fd.append("locationName", C[loc].name);
    fd.append("answers", JSON.stringify(r.answers));
    fd.append("website", form.website.value);
    fd.append("cv", r.file);

    var btn = $("#submitBtn"); btn.disabled = true; btn.textContent = "Sending…";
    fetch("/api/apply", { method: "POST", body: fd })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, j: j }; }); })
      .then(function (x) {
        if (!x.ok) throw new Error(x.j.error || "Something went wrong.");
        $("#formWrap").innerHTML = '<div class="done"><h3>Thank you.</h3><p>Your application is with the Maison Indē team. We’ll reach out by email if there is a fit. A copy of your application has been sent to you.</p></div>';
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch(function (err) {
        st.className = "error"; st.textContent = err.message + " You can also write to hello@maisoninde.com.";
        btn.disabled = false; btn.textContent = "Submit application";
      });
  });

  window.addEventListener("hashchange", route);
  setLoc(detect());
  route();
})();

