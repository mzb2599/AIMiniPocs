import fitz
from pathlib import Path
import logging

logging.basicConfig(level=logging.INFO)

BASE_DIR = Path(__file__).resolve().parent.parent

pdf_path = BASE_DIR / "data" / "Nahjul-Balagha.pdf"
out_path = BASE_DIR / "data" / "full_text.txt"

if not pdf_path.exists():
    raise FileNotFoundError(f"PDF not found: {pdf_path}")

chunks = []

with fitz.open(pdf_path) as doc:
    page_count = len(doc)

    for i, page in enumerate(doc, start=1):
        page_text = page.get_text("text").strip()
        chunks.append(f"\n\n[PAGE {i}]\n{page_text}")

        if i % 10 == 0:
            logging.info(f"Extracted {i}/{page_count} pages")

final_text = "".join(chunks)
out_path.write_text(final_text, encoding="utf-8")

logging.info(f"Done! Extracted {page_count} pages to {out_path}")