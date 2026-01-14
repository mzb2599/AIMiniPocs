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

model_embed = SentenceTransformer("all-MiniLM-L6-v2")
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
        gemini_model = genai.GenerativeModel("gemini-2.5-flash")
        response = gemini_model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error contacting Gemini: {e}"

def get_context(q_embed, k=5, threshold=0.3):
    D, I = index.search(np.array(q_embed, dtype="float32"), k=k)
    # Normalize scores: smaller distance = better
    max_d = np.max(D)
    scored = [(1 - (d / max_d)) for d in D[0]]
    retrieved = []
    for score, idx in zip(scored, I[0]):
        if score > threshold:  # keep only strong matches
            retrieved.append(data[idx])
    return retrieved


@app.get("/ask")
def ask(q: str):
    q_embed = model_embed.encode([q])  # we'll fix this below
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
    You are answering questions strictly based on Nahjul Balagha (Mutahhari edition).

    Follow these rules:
    1. Answer using only the text provided below.
    2. If the answer is not clearly found, say "Not mentioned explicitly in Nahjul Balagha."
    3. Always cite page numbers from the brackets [Page X].
    4. Respond in a clear, respectful, and scholarly tone.

    QUESTION:
    {q}

    CONTEXT:
    {context}

    Provide your answer below:
    """

    try:
        response = ask_llm(prompt)
        ans = response
    except Exception as e:
        ans = f"Error contacting Gemini: {e}"

    if "Page" not in ans:
        pages = ", ".join(str(r["page"]) for r in retrieved[:2])
        ans += f" [Sources: Pages {pages}]"

    return {"answer": ans, "sources": [r["page"] for r in retrieved]}
