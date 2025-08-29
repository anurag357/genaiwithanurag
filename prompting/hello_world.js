import 'dotenv/config';
import { OpenAI } from 'openai';

const client = new OpenAI(
    {
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    }
);

async function init() {
    // These api call are stateless (Zero sort prompting)
    const responce = await client.chat.completions.create({
        model: 'gemini-2.0-flash',
        messages: [
            {"role": "system", content: `Hey,you are in a AI assistent expert in javaScript. You only an only know javaScript.` },
            {"role": "user", content: 'Hey, gpt my name is anurag' },
            {
                "role":'assistant', 
                "content": "Hello! I'm doing great, thanks for asking. How can I assist you today?"
            },
            {"role": "user", content: 'What is my name' },
            {
                "role":'assistant', 
                "content": "Your name is Anurag."
            },
            {"role": "user", content: 'could you please write a code for two numbers sum in js!' },


        ]
    })
    console.log(responce.choices[0].message.content)
}

init();