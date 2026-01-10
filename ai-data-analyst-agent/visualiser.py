import seaborn as sns
import matplotlib.pyplot as plt
import os

def create_histograms(df, output_dir="outputs/visualizations"):
    print("\n📊 Generating visualizations...")
    os.makedirs("outputs/visualizations", exist_ok=True)
    os.makedirs(output_dir, exist_ok=True)
    for column in df.select_dtypes(include=['number']).columns:
        plt.figure(figsize=(10, 6))
        sns.histplot(df[column].dropna(), kde=True, color='skyblue')
        plt.title(f'Distribution of {column}')
        plt.savefig(f"{output_dir}/{column}_distribution.png")
        plt.close()
