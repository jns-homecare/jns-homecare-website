$ErrorActionPreference = "Stop"

$Domain = "https://jnshomecareandnursingservices.in"
$OldHttps = "https://jns-homecare.github.io/jns-homecare-website"
$OldHttp  = "http://jns-homecare.github.io/jns-homecare-website"
$Root = Split-Path -Parent $MyInvocation.MyCommand.Path

$Required = @("index.html", "sitemap.xml", "robots.txt")
foreach ($file in $Required) {
    if (-not (Test-Path (Join-Path $Root $file))) {
        throw "Missing '$file'. Extract this pack into the ROOT of the JNS website repository and run it there."
    }
}

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)
$HtmlFiles = Get-ChildItem -Path $Root -Filter "*.html" -File |
    Where-Object { $_.Name -ne "admin.html" }

$UpdatedPages = 0
$RemovedOldReferences = 0
$CanonicalProblems = @()

foreach ($File in $HtmlFiles) {
    $PathName = $File.Name
    if ($PathName -eq "index.html") {
        $CanonicalUrl = "$Domain/"
    } else {
        $CanonicalUrl = "$Domain/$PathName"
    }

    $Html = [System.IO.File]::ReadAllText($File.FullName)
    $Before = $Html

    # Replace old absolute GitHub Pages origin anywhere it appears (including homepage JSON-LD).
    $Html = $Html.Replace($OldHttps, $Domain).Replace($OldHttp, $Domain)
    if ($Before -match [regex]::Escape($OldHttps) -or $Before -match [regex]::Escape($OldHttp)) {
        $RemovedOldReferences++
    }

    # Remove existing canonical and og:url tags first so exactly one correct tag remains.
    $Html = [regex]::Replace(
        $Html,
        '(?is)<link\b(?=[^>]*\brel\s*=\s*["'']canonical["''])[^>]*>\s*',
        ''
    )
    $Html = [regex]::Replace(
        $Html,
        '(?is)<meta\b(?=[^>]*\bproperty\s*=\s*["'']og:url["''])[^>]*>\s*',
        ''
    )

    $SeoTags = "`n<link rel=`"canonical`" href=`"$CanonicalUrl`">`n<meta property=`"og:url`" content=`"$CanonicalUrl`">`n"
    if ($Html -notmatch '(?i)</head>') {
        $CanonicalProblems += "$PathName (missing </head>)"
        continue
    }
    $Html = [regex]::Replace($Html, '(?i)</head>', ($SeoTags + '</head>'), 1)

    [System.IO.File]::WriteAllText($File.FullName, $Html, $Utf8NoBom)
    $UpdatedPages++
}

# Keep the admin portal out of search results as an additional page-level safeguard.
$AdminPath = Join-Path $Root "admin.html"
if (Test-Path $AdminPath) {
    $AdminHtml = [System.IO.File]::ReadAllText($AdminPath)
    $AdminHtml = [regex]::Replace(
        $AdminHtml,
        '(?is)<meta\b(?=[^>]*\bname\s*=\s*["'']robots["''])[^>]*>\s*',
        ''
    )
    $AdminHtml = [regex]::Replace(
        $AdminHtml,
        '(?i)</head>',
        '<meta name="robots" content="noindex,nofollow">' + "`n</head>",
        1
    )
    [System.IO.File]::WriteAllText($AdminPath, $AdminHtml, $Utf8NoBom)
}

# Update every sitemap URL to the new custom domain; make index.html's URL the site root.
$SitemapPath = Join-Path $Root "sitemap.xml"
$SitemapText = [System.IO.File]::ReadAllText($SitemapPath)
$SitemapCount = [regex]::Matches($SitemapText, [regex]::Escape($OldHttps + "/")).Count
$SitemapText = $SitemapText.Replace($OldHttps, $Domain).Replace($OldHttp, $Domain)
$SitemapText = $SitemapText.Replace("$Domain/index.html</loc>", "$Domain/</loc>")
[System.IO.File]::WriteAllText($SitemapPath, $SitemapText, $Utf8NoBom)
$SitemapUrlCount = [regex]::Matches($SitemapText, '(?is)<loc>').Count

# Update robots.txt sitemap pointer and retain the admin disallow rule.
$RobotsPath = Join-Path $Root "robots.txt"
$Robots = [System.IO.File]::ReadAllText($RobotsPath)
$NewSitemapLine = "Sitemap: $Domain/sitemap.xml"
if ($Robots -match '(?im)^Sitemap:\s*.*$') {
    $Robots = [regex]::Replace($Robots, '(?im)^Sitemap:\s*.*$', $NewSitemapLine)
} else {
    $Robots = $Robots.TrimEnd() + "`r`n" + $NewSitemapLine + "`r`n"
}
if ($Robots -notmatch '(?im)^Disallow:\s*/admin\.html\s*$') {
    $Robots = $Robots.TrimEnd() + "`r`nDisallow: /admin.html`r`n"
}
[System.IO.File]::WriteAllText($RobotsPath, $Robots, $Utf8NoBom)

# Quick post-checks.
$CanonicalCount = 0
$OldUrlCount = 0
foreach ($File in $HtmlFiles) {
    $Html = [System.IO.File]::ReadAllText($File.FullName)
    $C = [regex]::Matches($Html, '(?is)<link\b(?=[^>]*\brel\s*=\s*["'']canonical["''])[^>]*>').Count
    if ($C -eq 1) { $CanonicalCount++ }
    $OldUrlCount += [regex]::Matches($Html, 'jns-homecare\.github\.io/jns-homecare-website').Count
}
$SitemapAfter = [System.IO.File]::ReadAllText($SitemapPath)
$RobotsAfter = [System.IO.File]::ReadAllText($RobotsPath)
$Report = @(
    "JNS SEO migration result"
    "========================"
    "Primary domain: $Domain"
    "HTML pages processed: $UpdatedPages"
    "Pages with exactly one canonical tag: $CanonicalCount"
    "Pages in sitemap: $SitemapUrlCount"
    "Sitemap URLs updated from old GitHub Pages URL: $SitemapCount"
    "Old GitHub Pages URL references remaining in HTML: $OldUrlCount"
    "Robots sitemap: $Domain/sitemap.xml"
    "Admin noindex added: $( (Test-Path $AdminPath) -and (([System.IO.File]::ReadAllText($AdminPath)) -match 'name="robots" content="noindex,nofollow"') )"
    ""
    "Notes:"
    "- The script updates public HTML pages, homepage JSON-LD URLs, sitemap.xml and robots.txt."
    "- admin.html is excluded from canonical public-page updates and marked noindex,nofollow."
    "- Review this report and the changed files before uploading them to GitHub."
    "- Google Search Console verification and sitemap submission are still a separate step."
)
[System.IO.File]::WriteAllLines((Join-Path $Root "SEO-MIGRATION-RESULT.txt"), $Report, $Utf8NoBom)

Write-Host ""
Write-Host "JNS SEO migration finished." -ForegroundColor Green
Write-Host "HTML pages processed: $UpdatedPages"
Write-Host "Pages with one canonical tag: $CanonicalCount"
Write-Host "Sitemap URLs updated: $SitemapCount"
Write-Host "Old GitHub Pages references remaining in HTML: $OldUrlCount"
Write-Host "See SEO-MIGRATION-RESULT.txt"
if ($CanonicalProblems.Count -gt 0) {
    Write-Host "Pages needing manual review:" -ForegroundColor Yellow
    $CanonicalProblems | ForEach-Object { Write-Host " - $_" }
}
Write-Host ""
Read-Host "Press Enter to close"
