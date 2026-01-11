# backend/config.py

DATA_FILES = [
    "data/sermons.json",
    "data/sayings.json",
    "data/letters.json"
]

EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
FAISS_INDEX_FILE = "backend/nahjul_index.faiss"
OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "llama3"
