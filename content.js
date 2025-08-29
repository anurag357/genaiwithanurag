import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("GEMINI_API_KEY is not defined in the environment variables.");
  process.exit(1);
}

// Weather Tool
async function getWeatherDetails(cityName = "") {
  const url = `https://wttr.in/${cityName.toLowerCase()}?format=%C+%t`;
  const { data } = await axios.get(url, { responseType: "text" });
  return `The current weather of ${cityName} is ${data}`;
}

const TOOL_MAP = {
  getWeatherDetails,
};

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function main() {
  const SYSTEM_PROMPT = `For a given query first think and breakdown the problem into sub problem. You should always keep thinking before giving the output. 
  Also, before output the final result to user you must check once if everything is correct. You also have a list of available tools that you can call based on user query.
  For every tool call that you make, wait for OBSERVATION from the tool which is the response from the tool that you call.

  Available Tools:
  - getWeatherDetails(cityName: string): Return the current data of city.

Rules: 
- Strictly follow the output JSON format.
- Always follow the output in sequence that is START, THINK, OBSERVE and OUTPUT.
- Always perform only one step at a time and wait for other step.
- Do multiple step of thinking before output.
- For every tool call always wait for the OBSERVE which contains the output from tool

Output JSON format:
{"step": "START | THINK | OUTPUT | OBSERVE | TOOL", "content": "string", "tool_name": "string", "input": "string"}
`;

  // ✅ No "system" role — instead prepend SYSTEM_PROMPT into user message
  const messages = [
    {
      role: "user",
      parts: [
        {
          text: SYSTEM_PROMPT + "\n\nUser Query: What is the weather of pune?",
        },
      ],
    },
  ];

  while (true) {
    const chat = model.startChat({ history: messages });
    const result = await chat.sendMessage("Continue reasoning...");
    const rawContent = result.response.text();

    console.log("rawData===>>>>>", rawContent);

    let parsedContent;
    try {
      parsedContent = JSON.parse(rawContent);
    } catch (err) {
      console.error("Failed to parse AI response:", rawContent);
      break;
    }

    messages.push({
      role: "assistant",
      parts: [{ text: JSON.stringify(parsedContent) }],
    });

    if (parsedContent.step === "START") {
      console.log("kick:", parsedContent.content);
      continue;
    }

    if (parsedContent.step === "THINK") {
      console.log("wait:", parsedContent.content);
      continue;
    }

    if (parsedContent.step === "TOOL") {
      const toolToCall = parsedContent.tool_name;
      if (!TOOL_MAP[toolToCall]) {
        messages.push({
          role: "user",
          parts: [
            {
              text: `{"step":"OBSERVE","content":"There is no such tool as ${toolToCall}"}`,
            },
          ],
        });
        continue;
      }
      const responseFromTool = await TOOL_MAP[toolToCall](parsedContent.input);
      messages.push({
        role: "user", // Gemini only accepts user/assistant
        parts: [
          { text: JSON.stringify({ step: "OBSERVE", content: responseFromTool }) },
        ],
      });
      continue;
    }

    if (parsedContent.step === "OUTPUT") {
      console.log("✅ Final Answer:", parsedContent.content);
      break;
    }
  }
}

main();