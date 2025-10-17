import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getEmbeddings = async (text) => {
  const res = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });
  return res.data[0].embedding;
};

export const queryLLM = async (question, context) => {
  const prompt = `You are a helpful assistant. Using the provided document context, answer the question briefly and accurately.\n\nContext:\n${context}\n\nQuestion: ${question}`;
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return res.choices[0].message.content;
};
