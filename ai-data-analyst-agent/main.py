import os
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import requests

def ask_AI(prompt: str) -> str:
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",  # <-- Ollama local endpoint
            json={"model": "llama3", "prompt": prompt, "stream": False}
        )
        return response.json().get("response", "")
    except Exception as e:
        return f"Error contacting AI model: {e}"

def load_data(file_path: str):
    print(f"📂 Loading data from {file_path}...")
    df = pd.read_csv(file_path)
    print(f"✅ Loaded {df.shape[0]} rows, {df.shape[1]} columns.")

    # Generate statistical summary
    print("\n🔍 Generating basic statistics...")
    summary = df.describe(include='all').transpose()
    print(summary.head())

    prompt = f"""
    You are an AI data analyst.
    Given the following data summary, provide:
    1. Key insights, patterns, and trends.
    2. Potential correlations or anomalies.
    3. Suggestions for further analysis or visualization.

    Data Summary:
    {summary.to_string()}
    """
    print("\n🤖 Asking AI for insights...")
    insights = ask_AI(prompt)
    print("\n🧠 AI Insights:\n")
    print(insights)

    os.makedirs("outputs/reports", exist_ok=True)
    with open("outputs/reports/data_summary.txt", "w", encoding="utf-8") as f:
        f.write(summary.to_string())
    with open("outputs/reports/ai_insights.txt", "w", encoding="utf-8") as f:
        f.write(insights)

    print("✅ Reports saved to outputs/reports/")

    # Generate visualizations
    print("\n📊 Generating visualizations...")
    os.makedirs("outputs/visualizations", exist_ok=True)
    for column in df.select_dtypes(include=['number']).columns:
        plt.figure(figsize=(10, 6))
        sns.histplot(df[column].dropna(), kde=True, color='skyblue')
        plt.title(f'Distribution of {column}')
        plt.xlabel(column)
        plt.ylabel('Frequency')
        plt.savefig(f'outputs/visualizations/{column}_distribution.png')
        plt.close()
        print(f"✅ Saved {column} visualization to outputs/visualizations/")

    print("\n🎉 All visualizations and reports generated successfully!")

if __name__ == "__main__":
    os.makedirs("data", exist_ok=True)
    os.makedirs("outputs", exist_ok=True)

    data_path = "data/sample.csv"

    # ✅ If file missing OR empty, create new sample data
    if not os.path.exists(data_path) or os.stat(data_path).st_size == 0:
        print("⚠️ No valid data file found — generating sample dataset...")
        pd.DataFrame({
            "age": [23, 25, 31, 22, 28],
            "salary": [40000, 50000, 62000, 38000, 52000],
            "experience": [1, 3, 5, 1, 4]
        }).to_csv(data_path, index=False)
        print("✅ Sample dataset created at data/sample.csv")

    load_data(data_path)
