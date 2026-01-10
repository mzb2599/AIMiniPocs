import os

def save_report(summary, insights, output_dir="outputs/reports"):
    os.makedirs(output_dir, exist_ok=True)
    with open(f"{output_dir}/data_summary.txt", "w", encoding="utf-8") as f:
        f.write(summary.to_string())
    with open(f"{output_dir}/ai_insights.txt", "w", encoding="utf-8") as f:
        f.write(insights)
