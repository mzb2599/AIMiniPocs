from pathlib import Path
import re, json, logging

logging.basicConfig(level=logging.INFO)

BASE_DIR = Path(__file__).resolve().parent.parent

in_path = BASE_DIR / "data" / "full_text.txt"
out_path = BASE_DIR / "data" / "nahjul_balaghah_full.json"

if not in_path.exists():
    raise FileNotFoundError(f"Input file not found: {in_path}")

raw = in_path.read_text(encoding="utf-8")

# Cleanup
raw = re.sub(r"\n{2,}", "\n", raw)
raw = re.sub(r"[^\S\r\n]+", " ", raw)
raw = raw.strip()

# Split by page markers
pages = re.split(r"\[PAGE\s*(\d+)\]", raw)

entries = []

for i in range(1, len(pages), 2):
    page = int(pages[i])
    text = pages[i + 1].strip()
    if not text:
        continue

    entries.append({
        "id": f"NB_{page:04d}",
        "book": "Nahjul Balagha (Mutahhari Edition)",
        "page": page,
        "source": "nahjul_balaghah",
        "chunk_type": "page",
        "text": text
    })

out_path.write_text(json.dumps(entries, indent=2, ensure_ascii=False), encoding="utf-8")

logging.info(f"Saved {len(entries)} chunks to {out_path}")