# OpenAi its a company and GPT is a product
## GPT- Genrative(Nature) Pretrained(Pre-Training-Data) Transformer
## Attention is all you need [https://arxiv.org/abs/1706.03762]
## Tiktokenizer [https://tiktokenizer.vercel.app/]
## JSTiktoken [https://www.npmjs.com/package/js-tiktoken]
## Vector Embedding Visulization [https://projector.tensorflow.org/]
## Plateform open AI [https://platform.openai.com/]

### Step process
  #### userInput
  #### genrateTokens
  #### input Embeddings
  #### positional encoding
  #### self Attension
  #### multi head attension
  #### transformer -> 1. Training phase 2. Inferencing(user) 

## GeminiAI Studio =  https://aistudio.google.com/prompts/new_chat
## https://ai.google.dev/gemini-api/docs/openai#javascript
## Claude SDK = https://docs.anthropic.com/en/docs/claude-code/sdk
## Zero sort prompting -> The model is given a direct question or task without any prior.
## Few Shot Prompting -> you givenan exmaple to the LLM
## Chain of Thought -> The model is incouraged to break down resoning step by step arrieving to the answers
## Selt Consistency Prompting -> The model genrate multiple responses and selects the most consistency answers.
## Persona Based Prompting -> The model is intructed to respond as if it were a particuler charector or professtional.
## GiminiAI ClI
## Curser CLI
## Cluad CLI
## Perplexcity CLI
## Computer used openAI
## Playwrite tools

## Agents SDK -> https://openai.github.io/openai-agents-js/guides/config/
## handoffs => In order to orchestrate between multiple agents, you can define handoffs for an agent. This will enable the agent to pass the conversation on to the next agent. 
  
  
##### ============================================ RAG =============================================================

# 1. Indexing Part
  ## Step1 - Row Data
  ## Step2 - Extract Information
  ## Step3 -  Chunks / Split
  ## Step4 - Vector Embedding
  ## Step5 - Store -> (Vector Database)

# 2. Query
  ## Step1 - User query
  ## Step2 - Vector Embedding
  ## Step3 - Search -> (Vector Database)
  ## Step4 -  Relevent Data
  ## Step5 - LLM (openAi)
  ## Step6 - Responce


### ================ DOCKER RUN ===============================================================

## docker run hello
## docker compose up
## docker compose up -d
## check docekr runing  =>>  docker ps
## http://localhost:6333/dashboard

### ========================================== Memory ===========================================
# Memory Type
# 1. Sort Term Memory -> Online user chat, booking order customer chat
# 2. Long Term Memory
  ## a. Factual Memory -> Name, DOB
  ## b. Episodic Memory -> Privious event telling something
  ## c. Semantic Memory -> General knowledge PM name
### ==================================== GenAI Road Map Learning ================================
# 📘 GenAI with Anurag – Learning Roadmap

This repository contains concepts, projects, and hands-on experiments around **Large Language Models (LLMs)**, **Prompt Engineering**, **AI Agents**, and **RAG (Retrieval Augmented Generation)**.

---

## 🔹 LLM Fundamentals
- **LLM Working**
- **Tokenization**
- **Project:** Tokenizer
- **Vector Embeddings**

---

## 🔹 Prompt Engineering
- **Prompt Types**
  - ChatML
  - Instruct
  - Alpaca
- **Prompting Techniques**
  - Zero-Shot
  - Few-Shot
  - Chain of Thought (CoT)
  - Persona
- **Projects**
  - Persona Project
  - Mini Cursor

---

## 🔹 AI Agents
- **From Scratch**
- **Concepts**
  - Prompts
  - Tools
- **Agent SDK**
  - Agents
  - Tools
  - Runner
  - Agent Handoff
  - Input Guardrail
  - Tracing
  - Thread Management
  - Human-In-The-Loop

---

## 🔹 Retrieval Augmented Generation (RAG)
- **Core Concepts**
  - Indexing
  - Splitting
  - LangChain
  - QdrantDB
- **Projects**
  - Website Clone
  - Build Notebook LLM
- **Advanced RAG**
  - Corrective RAG
  - Hyde RAG (Hypothetical Document Embeddings)
  - Query Re-writing
  - Chunking
  - LLM as Judge
  - Ranking
  - Sub-Query
  - Project: RAG on VVT for Udemy

---

## 🔹 Ecosystem Tools
- **LangGraph**
- **LangSmith**

---

🚀 Stay tuned as this repository evolves into a complete **GenAI Learning Hub**.
