import pandas as pd
import os

def load_data(file_path: str):
    if not os.path.exists(file_path) or os.stat(file_path).st_size == 0:
        raise FileNotFoundError("Dataset not found or empty.")
    print(f"📂 Loading data from {file_path}...")
    df = pd.read_csv(file_path)
    print(f"✅ Loaded {df.shape[0]} rows, {df.shape[1]} columns.")

    return df
