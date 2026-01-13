from fastapi import FastAPI
from sentence_transformers import SentenceTransformer
import faiss, numpy as np, json, requests
from pathlib import Path
import os
from dotenv import load_dotenv
load_dotenv()

if not os.getenv("GENAI_API_KEY"):
    raise RuntimeError("GENAI_API_KEY not set. Check .env or environment variables.")

app = FastAPI()

model = SentenceTransformer("all-MiniLM-L6-v2")
index = faiss.read_index("D://Code//AI//AIMiniPocs//nahjul balagha//data//embeddings.faiss")
data = json.loads(Path("D://Code//AI//AIMiniPocs//nahjul balagha//data//nahjul_balaghah_full.json").read_text(encoding="utf-8"))

#OLLAMA_URL = "http://localhost:11434/api/generate"

def ask_llm(prompt: str) -> str:

    # First try OLLAMA
    # try:
    #     ollama_payload = {
    #         "model": "mistral",
    #         "prompt": prompt,
    #         "max_tokens": 512,
    #         "temperature": 0.7,
    #         "top_p": 0.9,
    #         "n": 1,
    #         "stop": None
    #     }
    #     ollama_response = requests.post("http://localhost:11434/api/generate", json=ollama_payload)
    #     ollama_response.raise_for_status()
    #     ollama_data = ollama_response.json()
    #     return ollama_data["results"][0]["text"].strip()
    # except Exception as e:
    #     print(f"Error contacting OLLAMA: {e}")
    # Fallback to Gemini
    try:
        import google.generativeai as genai
        genai.configure(api_key=os.getenv("GENAI_API_KEY"))
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error contacting Gemini: {e}"


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
