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
data = json.loads((BASE_DIR / "data" / "nahjul_balaghah_full.json").read_text(encoding="utf-8"))

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
You are a knowledgeable Islamic scholar and historian.
Answer ONLY using Nahjul Balagha text provided.
Do not hallucinate or infer beyond given text.

QUESTION:
{q}

CONTEXT:
{context}
"""

        answer = ask_llm(prompt)

        return {
            "answer": answer,
            "sources": [{"page": r["page"]} for r in retrieved]
        }

    except Exception as e:
        return {"error": str(e)}