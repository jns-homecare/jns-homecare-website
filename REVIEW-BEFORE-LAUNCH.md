# JNS v2 — Review items before public launch

This document is an internal checklist. It is not a public website page.

## Business facts to confirm
- [ ] Official legal/trading name and brand presentation reviewed by auditor.
- [ ] Office address verified and approved for public display.
- [ ] Public phone number is owned and monitored by JNS.
- [ ] Public email is accessible to the person handling enquiries.
- [ ] Which locations outside Korattur can actually be served.
- [ ] Exact service list and the scope of each service confirmed by management.
- [ ] Staff credentials, registrations and role allocations checked.

## Business metrics not published
The website intentionally omits:
- 57 nurses (not confirmed as an active and available JNS roster count).
- 6 happy people / customer count (not supported by genuine customer evidence).
- Years of experience (new business; no number asserted).
- Ratings, reviews, awards, certifications, 24/7 guarantees or response-time promises.

Publish only facts JNS can substantiate.

## Careers
- [ ] Confirm the Patient Care Attender / Home Caregiver opening is currently recruiting.
- [ ] Confirm 12th-pass minimum education applies only to that non-clinical role.
- [ ] Confirm pay, shift, location, weekly off, travel, training/orientation and employment terms.
- [ ] Define exact clinical qualification and registration checks for nursing roles.
- [ ] Ensure no recruiter asks candidates for a fee or unnecessary sensitive documents.

## Clinical and privacy review
- [ ] Clinical adviser reviews service descriptions and role-boundary wording.
- [ ] Auditor/legal adviser reviews privacy, terms and cancellation policies.
- [x] Supabase-backed enquiry and recruitment forms are implemented with server-side validation, RLS-enabled tables, no direct public table grants and authenticated allowlisted admin actions.
- [ ] JNS management must approve record-retention periods for enquiries and applications and confirm an operational deletion/anonymisation process.
- [ ] Legal/privacy adviser must review the notices against the actual data flows, including form fields, Mumbai-region hosting, technical logs and hashed network identifiers.
- [ ] Confirm consent and privacy safeguards before publishing any real staff or patient photos.
- [ ] Confirm any third-party services (Google Fonts, Pexels) are acceptable.

## Technical checks
- [ ] Confirm GitHub Pages deployment succeeds for the latest main-branch commit and the updated policy/recruitment pages are live on the custom domain.
- [ ] All internal links work.
- [ ] Phone and email links work.
- [ ] Re-test the home-care enquiry form and candidate application form on the custom domain after the latest deployment; verify correct success/error messages and that no duplicate records are created.
- [ ] Confirm both form types save only the stated fields, require consent, reject invalid values and do not upload CVs or sensitive documents.
- [ ] Confirm admin sign-in, allowlist enforcement, listing and status updates using an authorised JNS admin account; never use real patient data for tests.
- [ ] Mobile and desktop layouts are reviewed.
- [ ] Add WhatsApp only after successful verification of the JNS business number.


- Confirm that the Pexels images load on desktop and mobile, and retain the photo-credit disclosure. Check that the clinical-context images are illustrative only.


## Visual refresh checks

- Confirm the circular JNS emblem renders as a perfect circle in header and footer.
- Hard-refresh browser after deployment (Ctrl+Shift+R) to fetch `site.css?v=20261104b`.
- Check desktop header, mobile menu, hero quick links, all service photos, and image credit labels.


## Current verified technical state (6 November 2026)
- [x] GitHub owner account `jns-homecare` is connected with repository push access.
- [x] Main privacy, recruitment privacy, careers and how-to-apply content corrections were committed to `main`.
- [x] BigRock `www` CNAME record was confirmed by the business owner in browser; owner verified the redirect works.
- [x] Supabase Edge Function `jns-api` version 4 is active; custom-domain CORS test returned a readable response with no browser CORS error.
- [x] Four database migrations applied; performance and health advisors returned no findings.
- [ ] Confirm deployment of the latest content commits on the public custom domain.
- [ ] Confirm authenticated form submission after v4 using a safe business-approved test or first real enquiry; do not insert fake candidate/patient data.
- [ ] Legal/privacy and clinical approvals remain open.
- [ ] Supabase leaked-password protection is unavailable on the current Free plan; it is a Pro-and-above feature.
