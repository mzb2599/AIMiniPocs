from langchain import PromptTemplate, LLMChain

def create_summarization_chain(llm):
    # Define the prompt template for summarization
    prompt = PromptTemplate(
        input_variables=["text"],
        template="Summarize the following text:\n\n{text}\n\nSummary:"
    )
    
    # Create and return the LLMChain
    return LLMChain(llm=llm, prompt=prompt)

# Example usage:
if __name__ == "__main__":
    from langchain_google_genai import ChatGoogleGenerativeAI
    import os
    from dotenv import load_dotenv

    load_dotenv()  # Load environment variables from .env file

    if "GOOGLE_API_KEY" not in os.environ:
        raise ValueError("Set GOOGLE_API_KEY environment variable")
    
    os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

    llm = ChatGoogleGenerativeAI(model="gemini-2.5-pro", temperature=0.7)
    summarization_chain = create_summarization_chain(llm)

    text_to_summarize = input("Enter text to summarize: ")
    summary = summarization_chain.run(text=text_to_summarize)
    print("Summary:", summary)