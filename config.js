// ───────────────────────────────────────────────────────────────
// EDIT THIS FILE to change roles, compensation, form questions.
// Everything on the page (roles, facts, form) is generated from it.
// ───────────────────────────────────────────────────────────────
const IMG = (f, w) => "https://www.maisoninde.com/cdn/shop/files/" + f + "?width=" + (w || 900);

window.CAREERS = {
  images: {
    hero: IMG("Anar-Bagh-pink-floral-block-print-mini-dress-front.jpg", 1000),
    a: IMG("blue-riviera-block-print-cotton-maxi-skirt-front-moving.jpg", 800),
    b: IMG("Anar-Bagh-yellow-floral-block-print-wrap-dress.jpg", 800),
    c: IMG("blue-riviera-block-print-smocked-midi-dress-closeup.jpg", 800),
    wide1: IMG("Garden-Checks-Dress-Styled-On-Model.jpg", 1200),
    wide2: IMG("Blue-Riviera-Skirt-Top--Styled-On-Model-sitting.jpg", 1200),
  },

  nl: {
    name: "Netherlands",
    facts: [
      ["Roles", "Internships"],
      ["Based in", "Amsterdam"],
      ["Compensation", "Shared at interview"], // EDIT: NL compensation
      ["Start", "Rolling · agreed with your school"],
    ],
    tracks: [
      {
        id: "design", name: "Fashion & Design", tag: "AMFI track",
        line: "Garment design & handcrafted techniques",
        does: ["Develop collections from research to tech pack", "Work on patterns, samples and construction", "Learn hand block print and quilting from the people who do it"],
        about: "You will help turn research and craft into garments: from mood boards and tech packs to samples, learning hand block print and quilting from the artisans who practise them. A natural fit for AMFI Fashion & Design students.",
        fit: "You love silhouettes, details and how a garment is actually made.",
        strengths: ["Collection development & design research", "Pattern making & sampling", "Garment construction", "Tech packs & specs", "Hand block print & craft techniques", "CLO3D / digital fashion", "Working with artisans & vendors"],
      },
      {
        id: "textiles", name: "Textiles / Print", tag: "AMFI track",
        line: "Natural fibers & traditional print methods",
        does: ["Create prints and colourways for new collections", "Explore natural fibers, dyes and finishes", "Work alongside block and screen print artisans"],
        about: "You will explore natural fibers, dyes and traditional print methods, and develop prints and colourways for upcoming collections, working alongside block and screen print artisans.",
        fit: "You are curious about cloth, colour and traditional print.",
        strengths: ["Print & surface design", "Natural fibers & dyes", "Hand block print", "Screen print", "Colour & palette development", "Textile research", "Embroidery & embellishment"],
      },
      {
        id: "branding", name: "Fashion & Branding", tag: "AMFI track",
        line: "Storytelling, content & digital media",
        does: ["Shape the story of each craft and maker", "Create photography, video and social content", "Support campaigns, lookbooks and the website"],
        about: "You will give every craft and maker a voice: photography, video, social content, copy and campaigns that carry the Maison Indē story to customers across Europe.",
        fit: "You tell stories with images and words, and care about brand.",
        strengths: ["Art direction", "Photography", "Videography & editing", "Styling", "Graphic design", "Social media content", "Copywriting & storytelling", "Website / UI design"],
      },
      {
        id: "management", name: "Fashion & Management", tag: "AMFI track",
        line: "Sales, strategy & growth marketing",
        does: ["Grow online sales and wholesale partnerships", "Run growth marketing and analyse what works", "Support planning, production and operations"],
        about: "You will help a small, craft-led brand grow responsibly: online sales, wholesale partnerships, growth marketing and the planning behind every collection.",
        fit: "You like numbers and strategy and want to grow a brand with purpose.",
        strengths: ["E-commerce & Shopify", "Performance marketing (Meta & Google Ads)", "Email marketing / CRM", "Wholesale & partnerships", "Analytics & reporting", "Operations & production planning", "Strategy & market research"],
      },
    ],
    form: [
      { title: "About you", fields: [
        { name: "name", label: "Full name", type: "text", required: true, autocomplete: "name" },
        { name: "email", label: "Email", type: "email", required: true, hint: "One you check regularly. We will contact you here.", autocomplete: "email" },
        { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, autocomplete: "tel" },
        { name: "city", label: "Where are you based?", type: "text", required: true, placeholder: "City, country" },
      ]},
      { title: "Your studies", fields: [
        { name: "school", label: "School / university", type: "text", required: true, placeholder: "e.g. AMFI, Amsterdam University of Applied Sciences" },
        { name: "programme", label: "Programme", type: "text", required: true },
        { name: "year", label: "Year of study", type: "select", required: true, options: ["Year 1", "Year 2", "Year 3", "Year 4", "Recent graduate"] },
      ]},
      { title: "Your internship", fields: [
        { name: "start", label: "Preferred start date", type: "date", required: true },
        { name: "duration", label: "How long are you available?", type: "select", required: true, options: ["3–4 months", "5–6 months", "6+ months"] },
        { name: "based", label: "Will you be living in or near Amsterdam?", type: "select", required: true, options: ["Yes, I already live there", "Yes, I will relocate for the internship", "Not sure yet"] },
        { name: "india", label: "Would you like to visit our craft clusters in India?", type: "select", required: true, options: ["Yes, definitely", "Maybe, tell me more", "Not for me"] },
        { name: "track", label: "Which track are you applying for?", type: "track", required: true },
      ]},
    ],
    trackFields: [
      { name: "strengths", label: "What are you strongest in?", type: "checks", required: true, hint: "Select all that apply.", other: true },
    ],
    work: [
      { title: "Your work", fields: [
        { name: "portfolio", label: "Portfolio link", type: "url", required: true, placeholder: "Behance, website, Google Drive…", hint: 'If it is a Drive link, set sharing to "Anyone with the link can view".' },
        { name: "cv", label: "CV / portfolio PDF", type: "file", required: true, hint: "PDF, up to 4 MB." },
        { name: "brand", label: "Tell us about a brand you love and what makes you love it.", type: "textarea", required: true },
        { name: "heard", label: "How did you hear about us?", type: "select", required: false, options: ["Instagram", "LinkedIn", "My school", "A friend", "Other"] },
      ]},
    ],
  },

  in: {
    name: "India",
    facts: [
      ["Roles", "Internships, graduation projects, part-time & full-time"],
      ["Based in", "Jaipur · or remote"],
      ["Compensation", "Paid, based on role & experience"],
      ["Start", "From October 2026 · rolling"],
    ],
    tracks: [
      {
        id: "design", name: "Design & Production", tag: "Jaipur preferred · remote possible",
        line: "Fashion, textile & print design, sampling & craft",
        does: ["Develop collections and design research", "Sampling, patterns and garment construction", "Work with artisans and vendors in Jaipur"],
        about: "Our collections are developed and handcrafted in Jaipur. You will work on collection development, sampling and construction, close to the artisans and vendors who bring each design to life.",
        fit: "You want your designs to be actually made, by hand, in small batches.",
        mode: ["On-site in Jaipur: I am already in or near Jaipur", "On-site in Jaipur: I can relocate", "Hybrid: in Jaipur for sampling and key days", "Remote"],
        strengths: ["Collection development & design research", "Pattern making & sampling", "Garment construction", "Tech packs & specs", "Print & surface design", "Hand block print, dyeing & craft techniques", "Embroidery & embellishment", "CLO3D / digital fashion", "Working with artisans & vendors"],
      },
      {
        id: "creative", name: "Creative & Visual", tag: "Jaipur preferred · remote possible",
        line: "Art direction, styling, photoshoots, graphics & content",
        does: ["Art direct and style photoshoots", "Design lookbooks, packaging and visual identity", "Create social content and website visuals"],
        about: "You will shape how Maison Indē looks and feels: art direction and styling for shoots, lookbooks, packaging, social content and website visuals.",
        fit: "You have a strong eye and love making things look beautiful.",
        mode: ["On-site in Jaipur", "Hybrid: in Jaipur for shoots and key days", "Remote"],
        strengths: ["Art direction", "Photography", "Videography & editing", "Styling", "Graphic design", "Branding & visual identity", "Print collateral: lookbooks, catalogues, packaging, tags", "Social media content", "Website / UI design", "Illustration"],
      },
      {
        id: "marketing", name: "Marketing & Digital", tag: "Fully remote",
        line: "Social media, Meta & Google Ads, copywriting, e-commerce & analytics",
        does: ["Grow our social channels and community", "Run and optimise Meta and Google Ads", "Write copy, support the website and track results"],
        about: "You will grow our reach and sales across social, Meta and Google Ads, copywriting, the website and analytics. This track is fully remote.",
        fit: "You enjoy testing, learning from numbers and writing words that sell.",
        strengths: ["Meta Ads (Facebook / Instagram)", "Google Ads", "Organic social media growth", "Copywriting", "Email marketing / CRM", "SEO", "Website & e-commerce (Shopify etc.)", "Analytics & reporting"],
      },
    ],
    form: [
      { title: "About you", fields: [
        { name: "name", label: "Full name", type: "text", required: true, autocomplete: "name" },
        { name: "email", label: "Email", type: "email", required: true, hint: "One you check regularly. We will contact you here.", autocomplete: "email" },
        { name: "phone", label: "Phone / WhatsApp", type: "tel", required: true, autocomplete: "tel", pattern: "^\\+?[0-9 ()-]{8,20}$", patternMsg: "Please include your country code, e.g. +91 98765 43210" },
        { name: "campus", label: "NIFT campus", type: "select", required: true, options: ["Bengaluru", "Bhopal", "Bhubaneswar", "Chennai", "Daman", "Gandhinagar", "Hyderabad", "Jodhpur", "Kangra", "Kannur", "Kolkata", "Mumbai", "New Delhi", "Panchkula", "Patna", "Raebareli", "Shillong", "Srinagar", "Other NIFT campus", "Not from NIFT"] },
        { name: "programme", label: "Programme / department", type: "select", required: true, options: ["B.Des: Fashion Design", "B.Des: Textile Design", "B.Des: Fashion Communication", "B.Des: Knitwear Design", "B.Des: Accessory Design", "B.Des: Leather Design", "B.Des: Fashion Interiors", "B.FTech", "M.Des", "MFM: Master of Fashion Management", "M.FTech", "Other"] },
        { name: "year", label: "Year of graduation", type: "text", required: true, hint: "Your expected year if you are still studying.", pattern: "^20(1[5-9]|2[0-9]|3[0-2])$", patternMsg: "Please enter a year, e.g. 2027" },
        { name: "city", label: "Which city are you currently based in?", type: "text", required: true },
      ]},
      { title: "Your role", fields: [
        { name: "applyingFor", label: "What are you applying for?", type: "checks", required: true, hint: "Select all that apply.", options: ["Internship", "Graduation project", "Part-time role", "Full-time role"] },
        { name: "start", label: "When can you start?", type: "date", required: true },
        { name: "duration", label: "How long are you available?", type: "select", required: true, options: ["1–2 months", "3–4 months", "5–6 months", "6+ months / ongoing"] },
        { name: "track", label: "Which track are you mainly applying for?", type: "track", required: true, hint: "Pick the one closest to your strengths." },
      ]},
    ],
    trackFields: [
      { name: "mode", label: "How would you prefer to work?", type: "select", required: true, fromTrack: "mode" }, // shown only if the track defines "mode"
      { name: "strengths", label: "What are you strongest in?", type: "checks", required: true, hint: "Select all that apply.", other: true },
      { name: "campaign", label: "Share a campaign, account or piece of content you have worked on, and what results it got.", type: "textarea", required: false, hint: "Optional. Links welcome.", onlyTracks: ["marketing"] },
    ],
    work: [
      { title: "Your work", fields: [
        { name: "portfolio", label: "Portfolio link", type: "url", required: true, placeholder: "Behance, website, Google Drive…", hint: 'If it is a Drive link, set sharing to "Anyone with the link can view".' },
        { name: "cv", label: "CV (PDF)", type: "file", required: true, hint: "PDF, up to 4 MB." },
        { name: "brand", label: "Tell us about a brand you currently love, and what makes you love it.", type: "textarea", required: true },
        { name: "heard", label: "How did you hear about us?", type: "select", required: false, options: ["Instagram", "LinkedIn", "NIFT placement cell / notice board", "WhatsApp group", "Friend / batchmate", "Faculty", "Other"] },
      ]},
    ],
  },
};
