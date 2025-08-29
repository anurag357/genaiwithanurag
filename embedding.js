import 'dotenv/config';
import {OpenAI} from 'openai'

const client = new OpenAI()

async function init() {
    const result = await client.embeddings.create({
        model:"text-embedding-3-large",
        input:'I love my self',
        encoding_format:"float",
    });
    console.log("======>>>>>>",result.data);

    console.log("length===>>>",result.data[0].embedding.length);
    return result;
}

init();