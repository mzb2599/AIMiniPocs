# A simple LLM solution to interact with the user and provide responses based on user input.
import os

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplat

class SimpleAgent:
    # Initialize the agent with a specific LLM model and prompt template
    def __init__(self, model_name="gemini-2.5-pro", temperature=0.7):

        # Check if the GOOGLE_API_KEY environment variable is set
        
        if "GOOGLE_API_KEY" not in os.environ:
            raise ValueError("Set GOOGLE_API_KEY environment variable")
        # Set the Gemini API key (replace YOUR_API_KEY with your actual key)
        os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

        # Initialize the LLM model and prompt template
        self.llm = ChatGoogleGenerativeAI(model=model_name, temperature=temperature)
        # Define a simple prompt template
        self.prompt_template = PromptTemplate(
            input_variables=["user_input"],
            template="You are a helpful assistant. Answer the following question:\n\n{user_input}\n\nAnswer:"
        )
        # Create the LLM chain with the model and prompt to handle user input and generate responses
        #  llm chain is used to combine the LLM and the prompt template
        # it takes the user input, applies the prompt template, and generates a response using the LLM
        self.chain = LLMChain(llm=self.llm, prompt=self.prompt_template)
        


    def get_response(self, user_input):
        response = self.chain.run(user_input=user_input)
        return response
    
if __name__ == "__main__":
    # Example usage of the SimpleAgent
    agent = SimpleAgent()
    # Take user input and get a response from the agent
    user_input = input("Enter your question: ")  # Example: "What is the capital of France?"
    response = agent.get_response(user_input)
    # The agent uses the LLM chain to process the input and generate a response
    print("Response:", response)
  