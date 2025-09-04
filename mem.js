import 'dotenv/config';
import { Memory } from 'mem0ai/oss';
import { OpenAI } from 'openai';

const client = new OpenAI({

})
const mem = new Memory({

    version: "v1.1",
    enableGraph: true,
    graphStore: {
        provider: "neo4j",
        config: {
            url: "bolt://localhost:7687", // put correct
            username: "neo4j",
            password: "FtBZOirP7shYOyXf1Mf6RhYJUE9s6_aW4q1_ZpPbT-M",
        },
    },
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

// chat('Hey, There my name is Anurag pathak born on 20th june in U.P.')
// chat('Hey, i love to teach and I student of a chaicode whichhas a website chaicode.com')
chat('Hey, You know i am a software developer and i love to drink tea and i from india')