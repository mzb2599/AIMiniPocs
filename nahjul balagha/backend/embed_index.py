import json, faiss, numpy as np, logging
from sentence_transformers import SentenceTransformer
from pathlib import Path
from config import EMBEDDING_MODEL

logging.basicConfig(level=logging.INFO)

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_FILE = BASE_DIR / "data" / "nahjul_balaghah_full.json"
FAISS_FILE = BASE_DIR / "backend" / "nahjul_index.faiss"
METADATA_FILE = BASE_DIR / "data" / "metadata.json"

# Load data
data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
texts = [d["text"] for d in data]

# Load model
model = SentenceTransformer(EMBEDDING_MODEL)

# Encode
embeddings = model.encode(texts, batch_size=32, show_progress_bar=True)
embeddings = np.array(embeddings).astype("float32")

# Normalize for cosine similarity
faiss.normalize_L2(embeddings)

# Create index
index = faiss.IndexFlatIP(embeddings.shape[1])
index.add(embeddings)

# Save index + metadata
faiss.write_index(index, str(FAISS_FILE))
METADATA_FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

logging.info(f"Indexed {len(texts)} sections successfully")