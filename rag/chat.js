import 'dotenv/config';
import {OpenAI} from 'openai'
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

const client = new OpenAI();

async function chat() {
    const user_query = "can you tell me about Node Debugger";

    // Ready the client openAI embedding model
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
        embeddings, 
        {
            url: 'http://localhost:6333',
            collectionName: 'pdf-collection'
        }
    );

    const vectorSearcher = await vectorStore.asRetriever({
        k:3,
    });

    const releventChunks = await vectorSearcher.invoke(user_query);

    const SYSTEM_PROMPT = `
        You are an AI assistent who help resolve user query based on the context available to you from a pdf file with
        the content and page number.
        
        Only ans based on the available context from file only.

        Context:
        ${JSON.stringify(releventChunks)}
    `
    const responce = await client.chat.completions.create({
        model:'gpt-4.1',
        messages:[
            {
                role: 'system',
                content: SYSTEM_PROMPT
            },
            {
                role: 'user', content: user_query
            }
        ]
    });

    console.log(`> ${responce.choices[0].message.content}`);
}
chat()