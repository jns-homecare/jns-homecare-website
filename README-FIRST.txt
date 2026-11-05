JNS CUSTOM DOMAIN SEO MIGRATION PACK
====================================

Primary domain:
https://jnshomecareandnursingservices.in/

WHAT THIS DOES
--------------
The PowerShell script updates:
- Canonical URL tags on public HTML pages (all root .html files except admin.html)
- Open Graph URL (og:url) on those pages
- Old GitHub Pages absolute URLs in page HTML and homepage LocalBusiness JSON-LD
- sitemap.xml to use the new custom domain; index.html is represented as /
- robots.txt sitemap location
- admin.html gets noindex,nofollow as an additional indexing safeguard
- SEO-MIGRATION-RESULT.txt is generated with a quick audit

BEFORE RUNNING
--------------
1. Open the JNS website repository:
   https://github.com/jns-homecare/jns-homecare-website
2. Download the repository ZIP from Code > Download ZIP.
3. Extract the repository ZIP into a normal folder.
4. Copy BOTH files from this pack into the extracted repository ROOT:
   - Apply-JNS-SEO-Migration.ps1
   - Run-JNS-SEO-Migration.bat
   The root is the folder containing index.html, sitemap.xml and robots.txt.
5. Double-click Run-JNS-SEO-Migration.bat.
6. Wait for "JNS SEO migration finished."
7. Open SEO-MIGRATION-RESULT.txt and confirm:
   - HTML pages processed should be 85.
   - Pages with one canonical tag should match the HTML pages processed.
   - Old GitHub Pages references remaining in HTML should be 0.
   - Sitemap URLs updated should be 85.

UPLOAD TO GITHUB
----------------
1. Open https://github.com/jns-homecare/jns-homecare-website
2. Click Add file > Upload files.
3. Upload the changed root files:
   - all modified public .html pages
   - admin.html
   - sitemap.xml
   - robots.txt
   - SEO-MIGRATION-RESULT.txt (optional audit report)
4. Commit the upload to the main branch.
5. Wait for the GitHub Pages deployment to complete successfully.

IMPORTANT
---------
- Do not upload this pack's two script files unless you want to keep them in the repository.
- Do not delete CNAME. It must continue to contain:
  jnshomecareandnursingservices.in
- Do not change BigRock nameservers or DNS records that are already working.
- Do not add or delete email MX/TXT records.
- Keep the admin page protected by Supabase authentication; noindex is not an access-control mechanism.
- Canonical tags and sitemap help search engines understand the preferred domain; they do not guarantee rankings or immediate indexing.
- Google Search Console verification and sitemap submission still need to be completed separately.
