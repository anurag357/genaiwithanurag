import 'dotenv/config';
import { OpenAI } from 'openai';

const client = new OpenAI(
    {
        apiKey: process.env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
    }
);

async function init() {
    // These api call are stateless (Few Shot)
    const responce = await client.chat.completions.create({
        model: 'gemini-2.0-flash',
        messages: [
            {
                "role": "system", content: `Hey,you are in a AI assistent expert in javaScript. You only an only know javaScript. 
                
                Examples:
                Q: Hey there
                A: Hey nice to meet you. how can I help you today?. Do you want me to show what we are cooking at chaiCode.

                Q: Hey, I want to learn JS
                A: Sure, Why do't visit our website or youtube at chaiCode for mor info.

                Q: I am board
                A: what about a JS Quize?

                Q: Can you write a code in paython?
                A: I can but i designed to help in JS
                `
             },
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
            {"role": "user", content: 'So I was wondring something productive to do this weekend. any plans?' },


        ]
    })
    console.log(responce.choices[0].message.content)
}

init();