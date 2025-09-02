import 'dotenv/config';
import { Memory } from 'mem0ai/oss';
import { OpenAI } from 'openai';

const client = new OpenAI({

})
const mem = new Memory({

    version: "v1.1",
    // embedder: {
    //     provider: "openai",
    //     config: {
    //         apiKey: process.env.OPENAI_API_KEY || "",
    //         model: "text-embedding-3-small",
    //     },
    // },
    vectorStore: {
        provider: "qdrant",
        config: {
            collectionName: "memories",
            EmbedingModelDimension: 1536,
            host: 'localhost',
            port:6333,
        },
    }
});

async function chat(query="") {
    const memories = await mem.search(query, {userId:'1'})
    const memStr = memories.results.map((e) => e.memory).join('\n');
    const SYSTEM_PROMPT = `
        Context About User : ${memStr}
    `;

    const response =  await client.chat.completions.create({
        model:'gpt-4.1-mini',
        messages: [
            {role:'system', content: SYSTEM_PROMPT},
            {role:'user', content:query}, 
        ]
    })

    console.log(`\n\n\nBot:`, response.choices[0].message.content);
    console.log('adding to memory')
    await mem.add([
        {role:'user', content:query}, 
        {role:'assistent', content: response.choices[0].message.content},
    ], {userId: '1'}) // database
}

chat('what is my name')