# JNS Home Care and Nursing Services — Premium Website v2

A static, responsive, English-language website package for JNS Home Care and Nursing Services.

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

## Important implementation limitations (please read)

1. **Forms are email-draft forms only.** They open the visitor's email application with the form content prefilled. The visitor must review and send the email. The website does not currently save enquiries or applications in an online database.
2. **No CV upload backend.** Candidates are asked to attach their CV manually in their email application.
3. **No admin dashboard or staff/patient login is implemented.** Do not publish login links until a secure backend, authentication, access rules and testing are added.
4. **WhatsApp is not connected.** A call and email path is provided. Add a WhatsApp link only after the JNS number is successfully verified and the business account is ready.
5. **No false business metrics are used.** The site does not display an unverified count of 57 nurses, six happy customers, years of experience, customer ratings, certifications, patient testimonials or 24/7 guarantees. These can be added only after JNS confirms and documents the facts.
6. **Stock photography is remote.** Selected illustrative photographs are loaded from Pexels. They are clearly labelled as stock and not JNS staff, clients or endorsements. A network connection is required to load them. See `photo-credits.html`.
7. **Policies are drafts.** Privacy, terms, clinical disclaimer and cancellation wording must be reviewed by JNS's auditor/legal adviser and the relevant clinical adviser before final public launch.
8. **Clinical content is informational only.** It does not teach clinical procedures or replace the treating professional's instructions.

## Publish to the existing GitHub Pages repository

Repository: https://github.com/jns-homecare/jns-homecare-website

1. Extract `JNS-Premium-Website-v2.zip` on your computer.
2. Open the extracted `JNS-Premium-Website-v2` folder.
3. Select **all contents inside that folder** (not the outer folder and not the ZIP itself).
4. In the GitHub repository, choose **Add file → Upload files**.
5. Upload all files and folders, keeping the `assets` folder and its subfolders in the repository root.
6. Replace existing same-named files with the V3 versions and add the new pages.
7. Commit the upload to the `main` branch.
8. Keep GitHub Pages set to **Deploy from a branch → main → /(root)**.
9. Check the Actions tab for a successful Pages deployment.
10. Open: https://jns-homecare.github.io/jns-homecare-website/

Do not upload only the ZIP file. `index.html` must remain at the repository root.

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
