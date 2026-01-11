from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
import faiss, numpy as np, json, requests
from pathlib import Path

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("D://Code//AI//AIMiniPocs//nahjul balagha//data//embeddings.faiss")
data = json.loads(Path("D://Code//AI//AIMiniPocs//nahjul balagha//data//nahjul_balaghah_full.json").read_text(encoding="utf-8"))

OLLAMA_URL = "http://localhost:11500/api/generate"

def ask_llm(prompt):
    payload = {"model": "llama3", "prompt": prompt, "stream": False}
    r = requests.post(OLLAMA_URL, json=payload, timeout=120)
    return r.json().get("response", "")

@app.get("/ask")
def ask(q: str):
    q_embed = model.encode([q])
    D, I = index.search(np.array(q_embed, dtype="float32"), k=3)
    retrieved = [data[i] for i in I[0]]

    context = "\n\n".join(
        [f"[Page {r['page']}] {r['text'][:600]}..." for r in retrieved]
    )

    prompt = f"""You are an Islamic scholar assistant.
Use only the context below from Nahjul Balagha (Mutahhari edition)
to answer faithfully. Always cite page numbers.

Question: {q}

Context:
{context}

Answer:"""

    ans = ask_llm(prompt)
    return {"answer": ans, "sources": [r["page"] for r in retrieved]}
