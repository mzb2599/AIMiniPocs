import json, faiss, numpy as np
from sentence_transformers import SentenceTransformer
from pathlib import Path

model = SentenceTransformer("all-MiniLM-L6-v2")
data = json.loads(Path("D://Code//AI//AIMiniPocs//nahjul balagha//data/nahjul_balaghah_full.json").read_text(encoding="utf-8"))

texts = [d["text"] for d in data]
embeddings = model.encode(texts, show_progress_bar=True)

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(np.array(embeddings, dtype="float32"))
faiss.write_index(index, "D://Code//AI//AIMiniPocs//nahjul balagha//data/embeddings.faiss")

print(f"✅ Indexed {len(texts)} sections.")
