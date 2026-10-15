# Maison Indē careers site

Static site (HTML/CSS/JS) plus one Vercel serverless function. Live at https://careers-maisoninde.vercel.app. Pushing to `main` deploys to production.

## Where to edit
- `config.js`: roles, compensation, hiring facts, form questions for Netherlands (`nl`) and India (`in`). Most content changes go here. To pause a role, remove its block from `tracks`.
- `index.html`: headline, "why Maison Indē" copy, footer.
- `styles.css`: colours and layout. Brand colours are the CSS variables at the top.
- `script.js`: page routing (list → role → apply) and the form builder. Avoid changing unless asked.
- `api/apply.js`: builds the application PDF and emails it with the CV. Change only if asked.

## Rules
- Keep the look consistent with maisoninde.com: Montserrat, sharp corners, brown #381a11 and terracotta #c6532c, photo-led.
- Never commit secrets. `RESEND_API_KEY` and email settings live in Vercel environment variables (see `.env.example`).
- Preview locally with `python3 -m http.server 4173` and open http://localhost:4173. The form only submits on the deployed site.
- Work on a branch and open a pull request. Vercel posts a preview link on the PR.
