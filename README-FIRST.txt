JNS HOME CARE — SUPABASE WEBSITE INTEGRATION PACK

This pack connects the home-care enquiry form and job application form to the new JNS Supabase backend and adds a small protected admin page.

FILES TO UPLOAD TO THE ROOT OF THE EXISTING GITHUB REPOSITORY
- request-care.html
- job-application.html
- privacy-policy.html
- admin.html
- robots.txt

FILES TO UPLOAD INTO THE EXISTING assets/ FOLDER
- assets/jns-forms.js
- assets/jns-admin.js

IMPORTANT
1. The Supabase publishable key included in the browser JavaScript is designed to be public. Do NOT add a database password, SUPABASE_SECRET_KEYS value, service_role key, or any other secret to these files.
2. The GitHub Pages origin configured in the Edge Function is https://jns-homecare.github.io.
3. The admin page is not linked from public navigation and is excluded from robots.txt. It is protected by Supabase Auth plus a server-side email allowlist; the URL itself is not a security boundary.
4. Existing sitemap.xml should NOT include admin.html.
5. The public forms collect only basic contact / service / recruitment details. They do not collect patient diagnoses, medical reports, prescriptions, identity documents, or CV uploads.

UPLOAD STEPS
A. Open https://github.com/jns-homecare/jns-homecare-website
B. Click Add file > Upload files.
C. Drag the five root files listed above into the upload area and commit them to main.
D. Open the assets folder and upload jns-forms.js and jns-admin.js there; commit to main.
E. Wait for the GitHub Pages workflow to finish, then test request-care.html and job-application.html from the published website.

ADMIN ACCOUNT — REQUIRED MANUAL STEP
The database allowlist is already seeded for jnshomenursingservices@gmail.com. Create the matching Auth user in Supabase Dashboard > Authentication > Users > Add user. Use that exact email and set your own strong password directly in Supabase. Do not send the password to ChatGPT or include it in GitHub files. Keep public sign-ups disabled unless there is a deliberate reason to enable them.
Then open https://jns-homecare.github.io/jns-homecare-website/admin.html and sign in.

POST-UPLOAD TESTS
1. Submit a test home-care enquiry using your own test contact details.
2. Sign in to admin.html and confirm the enquiry appears.
3. Change the enquiry status and confirm it saves.
4. Submit a test job application and confirm it appears in admin.html.
5. Confirm a non-allowlisted Auth user cannot open admin records.
6. Confirm no API secret/service-role key appears in browser source or GitHub.

LEGAL / OPERATIONAL NOTE
Before real use, JNS should have its legal/privacy adviser review this privacy notice, define a retention schedule, restrict internal admin access to authorised staff, and complete a browser test. The form integration is not a substitute for clinical, legal or privacy review.
