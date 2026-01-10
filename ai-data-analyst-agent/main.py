from data_loader import load_data
from analyzer import generate_summary
from visualiser import create_histograms
from ai_engine import ask_AI
from report_writer import save_report

def main():
    data_path = "data/sample.csv"
    df = load_data(data_path)
    summary = generate_summary(df)

    prompt = f"""
    You are an AI data analyst.
    Given the following summary, describe:
    1. Key trends
    2. Correlations or anomalies
    3. Suggestions for visualization

    Data Summary:
    {summary.to_string()}
    """
    insights = ask_AI(prompt)

    create_histograms(df)
    save_report(summary, insights)
    print("✅ Analysis complete! Check the outputs folder.")

if __name__ == "__main__":
    main()
