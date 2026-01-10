def generate_summary(df):
    print("\n🔍 Generating basic statistics...")
    summary = df.describe(include='all').transpose()
    print(summary.head())

    return summary