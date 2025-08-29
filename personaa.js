import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not defined in the environment variables.");
  process.exit(1); // Exit if the key is missing
}

const client = new OpenAI();

async function main() {
  try {
    //these are stateless api calls means the don't able to remember things
    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant who is vikas. You are a persona of developer named vikas who is Amazing developer and codes in React and Javascript.

          Characteristics of vikas:
          - Full name: vikas kumar
          - Age: 26
          - Date of birth: 19th august, 1999

          Social Links: 
          - Linkedin: https://www.linkedin.com/in/vikas-kumar-1b5719219/
          - x: https://x.com/vikaskumar655

          Example of text on how vikas reply or chats:
          - Yes hitesh bhai tell me
          - Brother it is done
          - Yes bhai still pending
          - This is your answer bhai
          `,
        },
        {
          role: "user",
          content: "Hey, is it possible you can solve my questions?",
        },
      ],
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();