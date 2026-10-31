"""Render tours.html card grid + niche mini-list from gyg_analysis.json +
editorial-notes.json + the research folder's tour_manifest.json.

Markers: <!-- BUILD:CARDS --> ... <!-- /BUILD:CARDS -->
         <!-- BUILD:NICHE --> ... <!-- /BUILD:NICHE -->
P.4: three sibling anchors per card (img link, h3 link, book CTA)."""
import json, os, re, html as H

SITE = os.path.dirname(os.path.abspath(__file__))
RES = os.path.join(SITE, "..", "tsukiji-fish-market")

with open(os.path.join(SITE, "gyg_analysis.json"), encoding="utf-8") as fh:
    analysis = json.load(fh)
with open(os.path.join(SITE, "editorial-notes.json"), encoding="utf-8") as fh:
    notes = json.load(fh)
with open(os.path.join(RES, "tour_manifest.json"), encoding="utf-8") as fh:
    manifest = json.load(fh)

AF = analysis["affiliate_base"]
TYPE_LABEL = {"auction-toyosu": "Auction / Toyosu", "sushi-class": "Sushi class",
              "food-tour": "Food tour", "market-tour": "Market walk",
              "cooking-class": "Cooking class"}

def esc(s): return H.escape(s or "", quote=True)
def clean(t): return re.sub(r"\s*-\s*20\d\d\s*\(Verified Review[s]?\)\s*$", "", t or "").strip()

def img_for(t):
    for u in (t.get("images") or []):
        if u and not u.endswith(".m3u8"):
            return u
    return None

cards = []
for t in analysis["tours"]:
    tid = t["id"]
    url = esc((t.get("url") or "") + AF)
    ty = t["type"]
    note = notes.get(tid, "")
    img = img_for(t)
    rating = ("%.1f" % t["rating"]).rstrip("0").rstrip(".")
    badge_extra = ""
    if "Likely to sell out" in (t.get("badges") or []): badge_extra = " &middot; likely to sell out"
    if analysis.get("refreshed") and not t.get("checked"):
        badge_extra += " &middot; August 2026 figures"  # not on the latest listing read: keep its own date
    img_html = ""
    if img:
        img_html = (f'    <a class="tour-img" href="{url}" target="_blank" rel="noopener noreferrer sponsored">\n'
                    f'      <span class="tour-badge {esc(ty)}">{esc(TYPE_LABEL.get(ty, ty))}</span>\n'
                    f'      <img src="{esc(img)}" alt="{esc(clean(t.get("title")))}" loading="lazy">\n'
                    f'    </a>\n')
    cards.append(
        f'  <article class="tour-card" data-type="{esc(ty)}" data-tags="{esc(ty)}">\n'
        + img_html +
        f'    <div class="tour-body">\n'
        f'      <h3><a href="{url}" target="_blank" rel="noopener noreferrer sponsored">{esc(clean(t.get("title")))}</a></h3>\n'
        f'      <p class="tour-note">{esc(note)}</p>\n'
        f'      <p class="tour-meta"><span class="star">&#9733; {rating}</span> &middot; {t["reviews"]} reviews &middot; from ${round(t["price"]) if t.get("price") else "?"}{badge_extra}</p>\n'
        f'      <a href="{url}" target="_blank" rel="noopener noreferrer sponsored" class="book-cta">Book &rarr;</a>\n'
        f'    </div>\n'
        f'  </article>')

pool_ids = {t["id"] for t in analysis["tours"]}
niche = [(tid, m) for tid, m in manifest.items()
         if tid not in pool_ids and not m.get("dead") and (m.get("reviews") or 0) >= 5]
niche.sort(key=lambda x: -(x[1].get("reviews") or 0))
niche_rows = []
for tid, m in niche:
    if any(k in (m.get("title") or "").lower() for k in ("private", "customiz", "chauffeur", "driver")):
        continue  # generic privates stay out of the visible list too
    niche_rows.append(
        f'    <li data-tags="{esc(m.get("type") or "")}"><a href="{esc(m["affiliate_url"])}" target="_blank" rel="noopener noreferrer sponsored">{esc(m["title"])}</a>'
        f' <span class="checked-stamp">&#9733; {esc(str(m.get("rating") or "?"))} &middot; {m.get("reviews")} reviews</span></li>')

path = os.path.join(SITE, "tours.html")
with open(path, encoding="utf-8") as fh:
    doc = fh.read()
doc = re.sub(r"(<!-- BUILD:CARDS -->).*?(<!-- /BUILD:CARDS -->)",
             lambda mm: mm.group(1) + "\n" + "\n".join(cards) + "\n  " + mm.group(2), doc, flags=re.S)
doc = re.sub(r"(<!-- BUILD:NICHE -->).*?(<!-- /BUILD:NICHE -->)",
             lambda mm: mm.group(1) + "\n" + "\n".join(niche_rows) + "\n    " + mm.group(2), doc, flags=re.S)
with open(path, "w", encoding="utf-8") as fh:
    fh.write(doc)
print(f"cards: {len(cards)} | niche rows: {len(niche_rows)}")
