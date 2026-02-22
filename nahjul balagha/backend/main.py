from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sentence_transformers import SentenceTransformer
import faiss, numpy as np, json, os
from pathlib import Path
from dotenv import load_dotenv
from config import EMBEDDING_MODEL, FAISS_INDEX_FILE

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent

model_embed = SentenceTransformer(EMBEDDING_MODEL)

index = faiss.read_index(str(FAISS_INDEX_FILE))

# full dataset used for semantic search
data = json.loads((BASE_DIR / "data" / "nahjul_balaghah_full.json").read_text(encoding="utf-8"))

# load helper for category files

def _load_category(name: str):
    """Read JSON list from backend/data/<name> and normalize each entry.
    Normalization ensures the frontend receives objects with at least:
    id, title, text, excerpt (short preview) and optional arabic.
    The original files may use different fields (text/saying, title, etc)."""
    path = BASE_DIR / "backend" / "data" / name
    if not path.exists():
        return []

    raw = json.loads(path.read_text(encoding="utf-8"))
    normalized = []
    for d in raw:
        text_val = d.get("text") or d.get("saying") or ""
        item = {
            "id": d.get("id") or d.get("saying_number") or str(len(normalized)),
            "title": d.get("title")
            or (f"Saying {d.get('saying_number')}" if d.get("saying_number") else ""),
            "arabic": d.get("arabic"),
            "text": text_val,
        }
        # excerpt: first 100 chars or existing excerpt field
        if d.get("excerpt"):
            item["excerpt"] = d.get("excerpt")
        else:
            item["excerpt"] = (
                text_val[:100] + "..." if text_val and len(text_val) > 100 else text_val
            )
        normalized.append(item)
    return normalized

def ask_llm(prompt: str) -> str:
    try:
        import google.generativeai as genai
        genai.configure(api_key=os.getenv("GENAI_API_KEY"))
        model = genai.GenerativeModel("gemini-2.5-flash")
        res = model.generate_content(prompt)
        return res.text.strip()
    except Exception as e:
        return f"LLM Error: {e}"

def get_context(q_embed, k=5, threshold=0.5):
    D, I = index.search(q_embed, k)
    retrieved = []
    for score, idx in zip(D[0], I[0]):
        if score > threshold:
            retrieved.append(data[idx])
    return retrieved

@app.get("/ask")
def ask(q: str):
    try:
        q_embed = model_embed.encode([q])
        q_embed = np.array(q_embed).astype("float32")
        faiss.normalize_L2(q_embed)

        retrieved = get_context(q_embed)

        context_chunks = []
        token_limit = 2500
        token_count = 0

        for r in retrieved:
            text = r["text"].strip()
            page = r["page"]
            tokens = len(text.split())

            if token_count + tokens > token_limit:
                break

            context_chunks.append(f"[Page {page}] {text}")
            token_count += tokens

        context = "\n\n".join(context_chunks)

        prompt = f"""
You are an Islamic scholar specializing in Nahjul Balagha.

Use ONLY the provided context to answer the question.
If the answer is not present, say "Not found in Nahjul Balagha".

Context:
{context_chunks}

Question:
{q}

Answer in a clear, structured, and respectful tone.
Also cite references like (Sermon 12, Page 53)
"""

        answer = ask_llm(prompt)

        return {
            "answer": answer,
            "sources": [{"page": r["page"]} for r in retrieved]
        }

    except Exception as e:
        return {"error": str(e)}
    
@app.get("/sermons")
def sermons():
    """Return sermons list loaded from the backend/data file."""
    return _load_category("sermons.json")

@app.get("/letters")
def letters():
    """Return letters list loaded from the backend/data file."""
    return _load_category("letters.json")

@app.get("/sayings")
def sayings():
    """Return sayings list loaded from the backend/data file."""
    return _load_category("sayings.json")