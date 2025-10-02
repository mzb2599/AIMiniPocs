import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableSequence
from langchain_core.prompts import PromptTemplate

class SmartAgent:
    # Initialize the agent with a specific LLM model and prompt template
    def __init__(self, model_name="gemini-2.5-pro", temperature=0.7):
        load_dotenv()  # Load environment variables from .env file

        # Check if the GOOGLE_API_KEY environment variable is set
        if "GOOGLE_API_KEY" not in os.environ:
            raise ValueError("Set GOOGLE_API_KEY environment variable")
        # Set the Gemini API key (replace YOUR_API_KEY with your actual key)
        os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

        # Initialize Gemini LLM
        self.llm = ChatGoogleGenerativeAI(model=model_name, temperature=temperature)

         # Step 1: Reformulate the question
        reformulate_prompt = PromptTemplate.from_template(
        "Rephrase the following question into a clearer, more specific version. "
        "Only return the reformulated question — do not explain or analyze it:\n\n{user_input}"        )

        # Step 2: Structured answer generation
        answer_prompt = PromptTemplate.from_template(
            "Answer the following question in a structured way:\n\n{reformulated}\n\n"
            "Return:\n"
            "Title: <short title>\n"
            "Explanation: <detailed explanation>"
        )

        # Chain: user_input → reformulated → structured answer
        self.chain = RunnableSequence(
            reformulate_prompt | self.llm,
            lambda x: {"reformulated": x.content},  # extract reformulated question
            answer_prompt | self.llm,
        )

    def get_response(self, user_input):
        # invoke replaces run()
        response = self.chain.invoke({"user_input": user_input})
        return response.content   # response is an AIMessage object
    
if __name__ == "__main__":
    agent = SmartAgent()
    user_input = input("Enter your question: ")
    print("Response:", agent.get_response(user_input))