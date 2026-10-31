#!/bin/sh
# Netlify build step: copy ONLY the public files into _public/ (the publish directory).
# Build files (notes, research, scripts, data JSON, seeds, image plans, netlify/) stay in the repo
# and are never served. Owner rule: never ship how a page was made.
# Add a new public file type here, never by publishing the repo root again.
set -eu
OUT=_public
rm -rf "$OUT"
mkdir -p "$OUT/img"
for f in ./*.html ./*.css ./*.js ./*.svg ./robots.txt ./sitemap.xml; do
  if [ -f "$f" ]; then cp "$f" "$OUT/"; fi
done
# IndexNow key file: a 32-hex-character name ending .txt
for f in ./*.txt; do
  case "$(basename "$f")" in
    [0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f].txt)
      cp "$f" "$OUT/" ;;
  esac
done
for f in ./img/*.webp ./img/*.png ./img/*.jpg ./img/*.jpeg ./img/*.svg ./img/*.avif; do
  if [ -f "$f" ]; then cp "$f" "$OUT/img/"; fi
done
echo "published: $(find "$OUT" -type f | wc -l) files"
