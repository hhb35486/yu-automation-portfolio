# Excel / CSV Cleaner Deploy Readiness

## Purpose

This document is the pre-deploy readiness check and public smoke test plan for the Excel / CSV cleaner portfolio demo.

This is not a formal product launch. The page is a portfolio / lead magnet feasibility demo, not a SaaS product, paid tool, data processing service, or production CSV parser.

## Current Commit

`7decc31` — `Add Excel CSV cleaner public demo`

## Public Demo Boundary

- Synthetic sample only
- No real customer data
- No internal company data
- No Fubon / insurance data
- No server upload
- Browser-side only
- Output requires human review

## Readiness Findings

- The homepage has one Excel / CSV cleaner portfolio card.
- The card links to `projects/excel-csv-cleaner.html`.
- The demo page uses only built-in synthetic CSV data.
- The demo page has no upload control.
- Copy and download actions load the built-in sample first if needed, so empty output should not crash the flow.
- The privacy warning is visible in the hero area and in the boundary section.
- The demo does not add API calls, LLM calls, tracking, analytics, or server upload.
- Existing portfolio pages already load Google Fonts, and the homepage already loads GSAP from a CDN. Phase P5 adds no new external CDN. If a strict zero-CDN public release is required, handle that as a separate site-wide cleanup before pushing.

## Pre-Deploy Checklist

| Check | Status | Notes |
| --- | --- | --- |
| Homepage card links to the correct demo page | Pass | `index.html` links to `projects/excel-csv-cleaner.html`. |
| Demo page loads | Manual smoke required | Open locally or after GitHub Pages deploy. |
| Built-in sample loads | Pass by code review | `loadCleanerSample()` runs on page load. |
| Clean action works | Pass by code review | The sample is parsed, trimmed, deduped, and rendered in-page. |
| Before / after tables render | Pass by code review | Tables render from parsed sample data. |
| Summary metrics render | Pass by code review | Empty rows, trimmed cells, normalized headers, and duplicate rows are shown. |
| Copy cleaned CSV works | Manual smoke required | Browser clipboard permission may vary. Fallback copy is present. |
| Download cleaned CSV works | Manual smoke required | Uses browser Blob download. |
| Privacy warning visible | Pass by code review | Hero note and boundary section are present. |
| Mobile layout acceptable | Manual smoke required | CSS has responsive rules; visual check still needed. |
| No duplicate Excel / CSV cards | Pass | One Excel / CSV cleaner portfolio card exists. |
| No external API / tracking / CDN | Partial | No API or tracking was added; existing site-wide font/animation CDN remains. |
| No sensitive terms except required privacy warnings | Pass by scan | Required warnings mention real customer data and identity documents only as "do not use" boundaries. |

## Post-Deploy Smoke Test

If the user later approves pushing and GitHub Pages publishes the site, run this public smoke test:

1. Open the GitHub Pages site.
2. Confirm the homepage loads.
3. Click the Excel / CSV card and confirm it opens the demo page.
4. Click `查看範例整理結果`.
5. Confirm before / after tables render.
6. Confirm summary metrics render.
7. Click `複製清理後 CSV` and confirm the clipboard behavior or fallback message is acceptable.
8. Click `下載清理後 CSV` and confirm the sample CSV downloads.
9. Open browser devtools and confirm no console errors from the demo flow.
10. Confirm the privacy warning is visible without scrolling too far.
11. Click the contact link and confirm it returns to the homepage contact section.

## Success Metrics

Use low-risk observation only. Do not add third-party analytics for this phase.

- User can open demo
- User clicks demo action
- User copies / downloads sample output
- User asks about similar internal tool
- User clicks contact

## Stop Rules

Stop or return to a small fix pass if any of these occur:

- Demo broken
- Privacy warning unclear
- User thinks they should upload real customer data
- Demo positioning is too generic
- Contact path unclear
- Mobile page broken

## Push Recommendation

`ready_to_push_after_user_approval`

The Excel / CSV cleaner demo is ready for a user-approved push as a portfolio demo, with one caveat: the existing portfolio site still uses pre-existing Google Fonts and GSAP CDN assets. If the deployment standard is strict zero-CDN, do that cleanup before pushing.
