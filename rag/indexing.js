import 'dotenv/config';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";


async function init() {
    const pdfFilePath = './nodejs.pdf';
    const loader = new PDFLoader(pdfFilePath);
    
    // Page by page load pdf file
    const docs = await loader.load();

    // Ready the client openAI embedding model
    const embeddings = new OpenAIEmbeddings({
        model: "text-embedding-3-large",
    });

    const vectorStore = await QdrantVectorStore.fromDocuments(docs,embeddings, {
        url: 'http://localhost:6333',
        collectionName: 'pdf-collection'
    });

    console.log('indxing of documents done...')
}
init();
