# JNS Home Care and Nursing Services — Premium Website v2

A responsive, English-language public website for JNS Home Care and Nursing Services, with Supabase-backed enquiry/recruitment forms and a protected JNS admin dashboard.

## Brand and contact details used

- Business name: **JNS Home Care and Nursing Services**
- Public phone: **+91 6381121476**
- Public email: **jnshomenursingservices@gmail.com**
- Office: **10/1, Padmavathy Nagar, Second Cross Street, Korattur, Chennai, Tamil Nadu – 600076**
- Service location statement: Korattur, Chennai. Nearby-location availability must be confirmed individually.
- Visual identity: approved circular JNS gold emblem, navy / white / gold palette with restrained teal accents.

The Udyam registration PDF supplied by the business was checked for the public office address and registered business name. Sensitive certificate fields (owner PAN, bank account, personal contact details) are intentionally not included.

## Included website

- **85 HTML pages**
- **24 individual service pages**
- **6 service-category pages**
- Dedicated careers and recruitment information pages
- Care-plan and scheduling pages (12-hour, 24-hour, night-time, short-term and ongoing)
- Patient and family resources
- Home-care planning blog and six practical articles
- Contact, request-care and feedback pages
- Privacy, terms, clinical disclaimer, cancellation and accessibility pages
- Responsive CSS and JavaScript
- Approved JNS logo in `assets/jns-emblem.webp` and `assets/jns-emblem.png`
- SEO `sitemap.xml`, `robots.txt`, `.nojekyll` and `PAGE-MANIFEST.json`

## Careers and role boundaries

The **Patient Care Attender / Home Caregiver** role states a minimum education of **12th pass or above**. This is a non-clinical daily-care position only.

Clinical nursing roles are kept separate and require the appropriate recognised qualification, applicable registration, competence and authorisation. Caregivers and attendants must not perform nursing procedures, administer clinical treatment or make clinical decisions.

Vacancy pages do not invent salary, opening count, shift guarantees or appointment promises. Confirm the actual position, location, hours, compensation and employment terms directly with JNS.

## Current implementation and remaining limitations (reviewed 6 November 2026)

1. **Home-care enquiries are stored online.** The `request-care.html` form posts to the Supabase Edge Function `jns-api`; validated submissions are stored in `public.jns_enquiries`.
2. **Recruitment applications are stored online.** The `job-application.html` form posts candidate details to the same Edge Function and stores them in `public.jns_job_applications`. The application form does not upload CVs, certificates or other files.
3. **Protected admin dashboard is implemented.** `admin.html` uses Supabase Auth and the server checks the signed-in email against the active JNS admin allowlist on every admin action. The page is marked `noindex,nofollow`; do not remove that directive or expose secret/service-role keys in browser code.
4. **Database access is server-mediated.** The four JNS public-schema tables have RLS enabled. Direct `anon` and `authenticated` table grants are absent; the Edge Function uses its server-side admin client after validating the request and, for admin actions, the allowlist. Do not add public table policies or grants without a reviewed access design.
5. **CORS origins are restricted.** The active `jns-api` function allows the GitHub Pages origin, the apex domain, the `www` domain and local development origins. Function version 4 was verified active on 6 November 2026.
6. **Candidate CV handling is separate.** Applicants should only send a CV if JNS requests it through an official channel; confirm the request before sharing documents. Never request passwords, OTPs, bank details or unnecessary identity documents at the first application stage.
7. **WhatsApp is a contact preference, not an API integration.** The enquiry form allows a visitor to select WhatsApp as their preferred contact method. No WhatsApp Business API or automated messaging integration is documented here; follow-up must be handled by JNS through its approved business channel.
8. **No false business metrics are used.** The site does not display an unverified count of 57 nurses, six happy customers, years of experience, customer ratings, certifications, patient testimonials or 24/7 guarantees. Add such claims only after JNS confirms and documents the facts.
9. **Stock photography is remote.** Selected illustrative photographs are loaded from Pexels. They are labelled as stock and do not depict JNS staff or clients. See `photo-credits.html`; use real JNS images only with appropriate consent and permission.
10. **Policies are operationally updated but not professionally signed off.** JNS management approved the operational retention and cancellation defaults on 6 November 2026: closed enquiries are automatically deleted 12 months after their last status update; applications marked `not_selected` are automatically deleted 6 months after their last status update; anti-spam rate-limit hashes are deleted after 30 days; standard cancellation notice is 24 hours; JNS's standard cancellation fee is zero unless a specific exception is disclosed and accepted in writing before booking. Privacy/terms/cancellation wording still requires legal/privacy adviser review, and the clinical disclaimer requires clinical adviser review. Do not describe these pages as professionally approved until those reviews occur.
11. **Clinical content is informational only.** It does not teach clinical procedures or replace the treating professional's instructions.
12. **Search indexing is not guaranteed.** JNS previously reported that Search Console ownership was verified, the sitemap submitted, 85 URLs discovered and six URL indexing requests submitted. Discovery or submission does not mean that Google has indexed those pages; check the live Search Console property for current status.

## Current GitHub Pages deployment

Repository: https://github.com/jns-homecare/jns-homecare-website

- Primary public URL: https://jnshomecareandnursingservices.in/
- `www` URL: https://www.jnshomecareandnursingservices.in/ (DNS CNAME points to `jns-homecare.github.io`; GitHub Pages redirects to the configured apex domain).
- Custom-domain `CNAME` file: `jnshomecareandnursingservices.in`.
- Repository default branch: `main`; the website files live at the repository root.

For a targeted website change, edit and commit only the affected files to `main`. Do not re-upload an old website ZIP over the live repository. Keep Settings → Pages configured for the existing root-site deployment. After committing, check the repository's deployment status in GitHub and verify the changed page on the public custom domain. Do not remove or replace the `CNAME`, DNS records or existing assets as part of an unrelated content edit. `index.html` must remain at the repository root.

## Final pre-launch checks

- Confirm the legal/business name and office address with the auditor.
- Confirm public phone and email ownership/access.
- Confirm service scope, staffing and locations currently served.
- Confirm whether "12-hour", "24-hour" and night shifts are actually available before advertising availability.
- Confirm actual caregiver vacancy, pay, hours, weekly off, location and recruitment process.
- Replace illustrative stock images with genuine JNS images only after obtaining consent and appropriate permissions.
- Review all policy drafts.
- Test every enquiry form, phone link, mobile page and internal link.
- Add WhatsApp only after account verification.
- Consider a custom domain after the brand name and public details are finalised.


## Service image update

The 24 individual services now use 24 distinct Pexels image IDs. The six homepage service cards and six category-page hero images are also distinct within their respective groups. All images are illustrative stock photographs, not JNS staff or patient photographs. See `photo-credits.html` for the source list.


## Branding and visual refresh (4 November 2026)

- The JNS emblem has been rebuilt as a true 1:1 circular gold-and-navy badge with transparent outer corners.
- Header and footer logo styling is constrained to a fixed square frame so it cannot expand the layout.
- CSS and JS URLs include a version query parameter to avoid stale browser/CDN styling after deployment.
- Homepage hero now includes a compact quick-services panel, enhanced framing, gold accent rules and upgraded card styling.


## Backend and privacy correction release (6 November 2026)

- Candidate application pages and the main privacy policy were corrected to describe the live Supabase form storage and anti-spam hash processing.
- Recruitment application details are stored in the JNS database; no CV/document upload is provided by the online form.
- JNS management approved the operational retention and cancellation defaults. A daily `pg_cron` job (`jns-data-retention-daily`, 02:15 UTC) applies the retention schedule; its security-definer function is executable only by `postgres`, not public or authenticated users.
- Privacy, recruitment privacy, cancellation and terms pages now state the current operational rules. Professional legal/privacy and clinical review is still required before any page is represented as legally or clinically approved.
