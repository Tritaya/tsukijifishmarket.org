# tsukijifishmarket.org — Independent Supervisor Audit

Date: 2026-08-02 · Auditor: fresh-context supervisor (audit-gyg-site skill) · Build: c30b6c1 (2026-08-02, single commit)
Deliberate-variation context honoured: "Ichiba Board" bento visual variant (DESIGN-BRIEF.md + BUILD-WORKFLOW §1). All non-visual blueprint rules audited as binding.

## Triage table

| Result | Check | Evidence | Cause | Novelty |
|---|---|---|---|---|
| 🟢 PASS | Site shape | index + tours + 16 subtopic pages (18 URLs) | – | – |
| 🟢 PASS | Theme & design system | `--accent: var(--tuna)` #c0392f, tuna/tamago palette; visual variant sanctioned | – | – |
| 🟢 PASS | Pretty URLs (deploy) | strip-html.ts present; netlify.toml has no `[[redirects]]`; LIVE: `/tours.html` → 301 `/tours`, `/index.html` → 301 `/`, all pretty URLs 200, live canonical clean, live HTML byte-identical to local | – | – |
| 🟢 PASS | Pretty URLs (internal refs) | 0 internal `.html` hrefs/canonicals/sitemap entries | – | – |
| 🟢 PASS | Sitemap | namespace exact; 18/18 pages, extensionless, no orphans either direction; lastmod 2026-08-02 = commit date | – | – |
| 🟢 PASS | Affiliate URL slugs | Every GYG href (41 distinct t-ids across 18 pages) verbatim in tour_manifest.json; the one exception t393715 (deliberate private-tour callout placement) is verbatim in the raw scrape JSONs (gyg_tsukiji_l143699 + l165010); JSON-LD ItemList URLs also manifest-verbatim | – | – |
| 🟢 PASS | Per-site attribution | 100% of GYG hrefs carry `partner_id=1Q7ZSYC` + `cmp=tsukijifishmarket`; 0 missing; GYG analytics widget with `data-gyg-partner-id` on all 18 pages | – | – |
| 🟢 PASS | og:image | 11 unique og:images all HTTP 200 (HEAD with descriptive UA per the Wikimedia 403-to-anonymous-UA gotcha) | – | – |
| 🟢 PASS | Hotlinked imagery | All 49 unique external image URLs (Commons + GYG CDN) HEAD 200; every `upload.wikimedia.org` src verbatim in images_manifest.json; all 9 `historical:true` images confined to history-and-redevelopment.html | – | – |
| 🟢 PASS | Outbound audit | 0 leaks. Only non-affiliate outbounds are 51 commons.wikimedia.org links on photo-credits.html = required CC BY(-SA) attribution layer (sanctioned variation) | – | – |
| 🟢 PASS | Filter chips | 1 axis, 5 chips (all + 4 types) ≤ 11 | – | – |
| 🟢 PASS | Anchor-nav placement | hero(88) < facts-bar(97) < anchor-nav(108) < first section(120) | – | – |
| 🟢 PASS | Highlighter | em-stop gradient (.15em/1.05em), hover variant too | – | – |
| 🟢 PASS | FAQ | 14 faq-items on index; 0 HTML inside JSON-LD answers (all pages) | – | – |
| 🟢 PASS | AEO robots.txt | GPTBot, OAI-SearchBot, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended all `Allow: /` | – | – |
| 🟢 PASS | JSON-LD | All 18 pages ≥3 `"@type"` (min: photo-credits 5, tours 9); all 18 blocks parse | – | – |
| 🟢 PASS | Encoding | 0 mojibake patterns | – | – |
| 🟢 PASS | Phase-2 wiring / phantom links | Only `?type=` links; all 4 values are live chips; no orphans | – | – |
| 🟢 PASS | Whole-card clickable (P.4) | 20 cards = 20 img-links = 20 title-links = 20 book-CTAs | – | – |
| 🟢 PASS | Soft-nav interceptor (E.5) | path-guard 1 (`isToursPage`) + scrollIntoView 1 + setActive* 4 | – | – |
| 🟢 PASS | Chip JS/HTML match | `.filter-chip` in both; `dataset.filter` ↔ `data-filter` | – | – |
| 🟢 PASS | Catalogue prose u-links (E.2) | tours-intro wraps all 4 type names as chip presets + u-link to /toyosu-tuna-auction-tour | – | – |
| 🟢 PASS | Scoring-constant leak | 0 matches; methodology states 30-review/4.3★ floor editorially (public criteria, not internal tiers) | – | – |
| 🟢 PASS | Cache-Control / fonts / sticky / overflow | no-cache on css+js; `display=optional` ×18; .filter-bar non-sticky; overflow-x clip + .fact min-width 0 + overflow-wrap anywhere | – | – |
| 🟢 PASS | .gitignore | .commit-msg.tmp + *.tmp present | – | – |
| 🟢 PASS | CJK containment | 0 CJK outside `<span class="jp">` on all pages (photo-credits exempt by design) | – | – |
| 🟢 PASS | FACT: tuna-auction lottery table | All 4 rows (Sep–Dec 2026 viewing months) match results/Tuna_auction.json `official_fy2026_schedule` exactly; result dates all verified Thursdays; Dec "no 25 Dec–5 Jan dates" matches the blackout rule | – | – |
| 🟢 PASS | FACT: five-calendars page | Aug closed {2,5,9,11,14,15,16,19,23,26,30} & Sep {2,6,9,13,16,20,21,22,27,30} = source worked example; Nov Weds 11+18, Dec Weds 2,9,16,23 + open Wed 30 Dec; temp opens 6 May / 23 Sep / 27 Dec; Toyosu 114 seafood / 118 produce (+4 Weds 14 Oct, 4 Nov, 25 Nov, 30 Dec); Plat Aug closures {5,14,15,16,19,26}; New Year 31 Dec + 1–4 Jan closed, 5 Jan hatsuseri — all match results/Hours_closed_days.json | – | – |
| 🟢 PASS | December-advisory tense | Past tense + "not been reissued" in topicMessages.december and tours copy | – | – |
| 🔴→fixed (doc) | "affiliate" word rule | 3 lines on sushi-breakfast.html ("It runs a nearby affiliate, Sushi Dai Bekkan" in bento-note, FAQ answer, JSON-LD) FAIL the Section Q rule as written — but are the organizational word sense (a restaurant's related business), not the affiliate-marketing voice problem the rule targets. Site content is correct; the RULE was over-broad. | Doc-was-wrong (rule matched a word sense it never anticipated) | NEW (blueprint had no `affiliated`/organizational-sense carve-out) |
| ◯ MANUAL | Comparison-table operator linking | No Operator/Book-column tables exist anywhere (transactional page uses cards, boards are info tables) — N/A after eyeball | – | – |
| ◯ MANUAL | Bento/myth/cal cell link coverage | dish-cards 14/14 linked; bento-cells 58/70 (12 unlinked are pure stat tiles: "Entry ¥0", subway-exit facts — facts-bar analogues); myth-cards 57/85 (unlinked ones are corrective/defensive content, covered by the flag-list exception rationale); cal-cards 21/23 (2 unlinked on senkyaku-banrai) | Creative latitude | – |
| ◯ MANUAL | t1161033 retitle surfacing | Disclosure-block intro says "One is flagged in our notes as retitled since our scrape" but does not identify WHICH row; the t1161033 li shows the scraped title while its slug now names a temple-breakfast product | Creative latitude (deliberate per build) | – |

## Blackboard cross-validation (🟡 self-reported → independent check)

All build-agent claims validated 🟡→🟢: 18/18 JSON-LD parse ✓ · GYG URLs manifest-verbatim incl. t121812/t393715 repairs ✓ · Wikimedia manifest-verbatim + historical-flag enforcement ✓ · zero .html hrefs ✓ · zero CJK outside .jp ✓ · 11/11 og:images 200 with proper UA ✓ (independently re-run) · no phantom ?type/?topic ✓ · December-advisory tense ✓ · live pretty-URL chain ✓ (deploy completed after the blackboard message was written).

## Auto-applied doc updates (Step 5)

1. **Section Q ""affiliate" word" bullet — word-sense carve-out** (5b rewrite, AUDIT-EDIT comment inline). Rationale: rule flagged ordinary editorial English ("runs its own nearby affiliate, Sushi Dai Bekkan") as a marketing-voice violation; carve-out exempts `(?:un)?affiliated` and `affiliate(s) + [, |called |named ] + CapitalizedName`, keeps all marketing collocations restricted. **Self-verify: PASS** — old rule flags exactly the 3 organizational-sense lines on this site (demonstrated false positive), new rule flags 0, and 4/4 synthetic marketing-sense body-prose violations still FAIL (script: scratchpad/selfverify_affiliate.py output logged in audit session).
2. **Section J "affiliate in editorial copy" bullet — one-sentence word-sense note** pointing at the Section Q programmatic test (AUDIT-EDIT comment inline). Same rationale/self-verify as #1.

## Proposed but NOT applied (no still-broken state to self-verify against)

- **"Never copy URLs from printed console output — re-pull from the JSON file."** Build agent's own blackboard candidate: three image URLs were pasted from a print truncated at 110 chars. Detection already exists (manifest-membership sweep caught it pre-ship; audit re-confirmed 0 violations), so a new audit check would pass trivially and cannot self-verify against a broken state. Recommend adding as a Section J narrative prevention bullet (precedent: grandcanyonheli 2026-05-17 prevention-pattern entry) at the user's discretion.

## Step-6 deferred recommendations (creative latitude / MANUAL — not applied)

1. **t1161033**: append "(retitled since our scrape)" to its niche-list li — or drop the listing per verify-before-feature. The generic intro flag doesn't tell the visitor which of the 9 rows will land on a differently-titled product.
2. **senkyaku-banrai cal-cards ×2** without links: add internal u-link to /hours-and-calendars where natural.
3. **12 stat-tile bento-cells** without links: acceptable as facts-bar analogues; spot-add internal u-links only where a natural target exists (do not force).

## Site bugs to fix

**None.** Zero unfixed site bugs found. The one 🔴 was a blueprint-rule defect, fixed in the doc (self-verified); the site content it flagged is correct as-is.

## Blueprint sections modified

- Section Q, ""affiliate" word" checklist bullet (carve-out + programmatic strip-regex added)
- Section J, "The word "affiliate" doesn't belong in editorial copy" bullet (one-sentence word-sense note)
Both marked with `AUDIT-EDIT 2026-08-02: tsukijifishmarket.org audit` comments; each edit is independently git-revertible.
