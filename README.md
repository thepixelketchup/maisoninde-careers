# Maison Indē careers site

Static site + one serverless function (Vercel). Target: `careers.maisoninde.com`.

- `config.js`: **edit this** to change roles, compensation, facts and form questions (Netherlands and India).
- `api/apply.js`: builds a PDF of the answers and emails it, with the CV, to the team. The applicant gets a copy.
- `.env.example`: environment variables to set in Vercel (Resend key, recipient emails per location).

## Go live
1. Resend: verify maisoninde.com, create an API key.
2. Vercel: import this folder, add the env vars, add domain `careers.maisoninde.com`.
3. DNS: CNAME `careers` to the Vercel target.
4. Shopify: add a "Careers" link to the footer menu pointing to https://careers.maisoninde.com.

Local preview: `python3 -m http.server 4173` (form needs `vercel dev` to submit).
