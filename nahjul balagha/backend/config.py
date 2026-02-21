from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

DATA_FILES = [
    BASE_DIR / "data" / "sermons.json",
    BASE_DIR / "data" / "sayings.json",
    BASE_DIR / "data" / "letters.json"
]

FAISS_INDEX_FILE = BASE_DIR / "backend" / "nahjul_index.faiss"

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434/api/generate")
MODEL_NAME = os.getenv("MODEL_NAME", "mistral")

TOP_K_RESULTS = 5
MAX_TOKENS = 512
TEMPERATURE = 0.3