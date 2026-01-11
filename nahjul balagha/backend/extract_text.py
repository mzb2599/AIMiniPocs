import fitz
from pathlib import Path

pdf_path = Path("D://Code//AI//AIMiniPocs//nahjul balagha//data//Nahjul-Balagha.pdf")
out_path = Path("D://Code//AI//AIMiniPocs//nahjul balagha//data//full_text.txt")

text = ""
with fitz.open(pdf_path) as doc:
    page_count = len(doc)
    for i, page in enumerate(doc, start=1):
        text += f"\n\n[PAGE {i}]\n" + page.get_text("text").strip()
        if i % 10 == 0:
            print(f"Extracted {i}/{page_count} pages...")

out_path.write_text(text, encoding="utf-8")
print(f"✅ Done! Extracted {page_count} pages to {out_path}")
