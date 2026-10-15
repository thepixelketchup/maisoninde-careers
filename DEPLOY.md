# Deploy (5 minutes)

## 1. Resend (sends the application emails)
1. Sign up at resend.com with a maisoninde.com address.
2. Domains > Add Domain > `maisoninde.com`. Resend shows 3-4 DNS records (SPF, DKIM, DMARC).
3. Add those records where maisoninde.com DNS is managed (Shopify Domains / your registrar). Click Verify (can take a few minutes up to a few hours).
4. API Keys > Create API Key > "Sending access". Copy the `re_...` key.
5. Make sure careers@maisoninde.com exists as a real inbox or alias, so applications arrive.

Until the domain is verified Resend only sends from onboarding@resend.dev to your own Resend login email: fine for a first test.

## 2. Vercel
In this folder:

    npx vercel login
    npx vercel --prod --name careers-maisoninde --scope the-pixel-ketchup

Then add environment variables (Project > Settings > Environment Variables, Production):

    RESEND_API_KEY=re_...
    MAIL_FROM=Maison Indē Careers <careers@maisoninde.com>
    NOTIFY_TO_NL=careers@maisoninde.com
    NOTIFY_TO_IN=careers@maisoninde.com
    SEND_CONFIRMATION=true

Redeploy (`npx vercel --prod`) so the variables apply.
The site is then at https://careers-maisoninde.vercel.app

## 3. Test
Submit a test application from each location; you should get an email with `Application-<name>.pdf` and `CV-<name>.pdf`.
