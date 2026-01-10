import requests

def ask_AI(prompt: str, model="llama3"):
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={"model": model, "prompt": prompt, "stream": False}
        )
        return response.json().get("response", "")
    except Exception as e:
        return f"Error contacting model: {e}"
