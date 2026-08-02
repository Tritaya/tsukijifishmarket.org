# tsukijifishmarket.org — site notes for Claude sessions

Information-first GYG affiliate site for Tokyo's fish markets (Tsukiji outer
market + Toyosu), built Aug 2026 in the VISUAL "Ichiba Board" bento variant
(user-directed deviation from blueprint B — documented in BUILD-WORKFLOW; the
audit must read it as deliberate). Git-tracked, web-blocked via edge function.

## Architecture
- 18 URLs: / + /tours (hand-curated 20-card grid, type axis: food-tour /
  sushi-class / market-tour / auction-toyosu) + /toyosu-tuna-auction-tour
  (transactional cluster page) + 14 guides + /photo-credits.
- Research SSOT: `wirecutter/tsukiji-fish-market/` — 22 JSONs +
  report_synthesis.md (READ FIRST: myth corpus §4, do-not-publish §9,
  freshness contract §10) + DESIGN-BRIEF.md + images_manifest.json (51
  licensed Commons images — pages may use ONLY these + GYG images) +
  tour_manifest.json (id → VERBATIM affiliate URL; never construct slugs —
  four guess/retitle traps caught during this build).
- Tour data: gyg_analysis.json (20-tour pool, floor 30 niche-down, 17
  excluded ids with reasons in build_analysis.py) + editorial-notes.json +
  build_tours.py (regenerates /tours between BUILD markers).
- cmp=tsukijifishmarket, partner_id=1Q7ZSYC.

## Content rules specific to this site
- TWO MARKETS: auction/wholesale = Toyosu (cool/ice styling), eating = Tsukiji
  (warm styling). Never re-merge them.
- FIVE calendars (lanes / Uogashi bldg / Toyosu seafood / Toyosu produce /
  Senkyaku Banrai) — never collapse; special trading days exist.
- December 2025 overtourism advisory: operator-targeted, December-only,
  NOT reissued — NEVER present-tense. Re-check ~20 Nov 2026.
- No tour can sell auction-deck access (official FAQ) — the tours pages are
  built on this; don't soften it. t1010286's terms carry the false December
  claim — keep the honest note on its cards.
- Tax-free switches to airport refunds 1 Nov 2026 (no transition) — the
  knives/shopping + practical pages need a same-week rewrite pass.
- Prices always carry as-of dates; re-scrape before editing any price.
- JP characters allowed ONLY inside <span class="jp">.
- Historical (pre-2018) images ONLY on /history-and-redevelopment, captioned.

## Maintenance scripts (research folder)
uog_cal.py (calendar collision parse — rerun when 2027 calendars publish,
~Sept 2026), diff_enjp.py (official EN/JP shop-page divergence), parse_pay.py
(payment coverage stats).

## Sister network
None declared yet.

## Freshness contract (from report_synthesis §10)
~20 Nov 2026 advisory + Dec lottery · 1 Nov 2026 tax-free rewrite · 25 Dec
2026 Hongan-ji works end · Jan 2027 hatsuseri · ~Sept 2026 2027-calendars ·
end-2027 teamLab scheduled close · ONE PARK×ONE TOWN temp facilities
(no name/date yet — never invent).
