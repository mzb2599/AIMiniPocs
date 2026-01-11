from pathlib import Path
import re, json

in_path = Path("D://Code//AI//AIMiniPocs//nahjul balagha//data//full_text.txt")
out_path = Path("D://Code//AI//AIMiniPocs//nahjul balagha//data/nahjul_balaghah_full.json")

raw = in_path.read_text(encoding="utf-8")

# Basic cleanup
raw = re.sub(r"\n{2,}", "\n", raw)
raw = re.sub(r"[^\S\r\n]+", " ", raw)

# Split by page markers inserted earlier
pages = re.split(r"\[PAGE\s*(\d+)\]", raw)
entries = []

for i in range(1, len(pages), 2):
    page = int(pages[i])
    text = pages[i+1].strip()
    if not text:
        continue
    entries.append({
        "id": f"NB_{page:04d}",
        "book": "Nahjul Balagha (Mutahhari Edition)",
        "page": page,
        "text": text
    })

out_path.write_text(json.dumps(entries, indent=2, ensure_ascii=False), encoding="utf-8")
print(f"✅ Saved {len(entries)} chunks to {out_path}")
