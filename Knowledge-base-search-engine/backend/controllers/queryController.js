import { getEmbeddings, queryLLM } from "../utils/embeddings.js";
import { getAllDocs } from "./uploadController.js";

// Calculate cosine similarity
function cosineSimilarity(a, b) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (normA * normB);
}

export const askQuery = async (req, res) => {
  try {
    const { question } = req.body;
    const qEmbedding = await getEmbeddings(question);
    const docs = getAllDocs();

    // Find most relevant doc
    let bestDoc = null;
    let bestScore = -1;
    for (let d of docs) {
      const score = cosineSimilarity(qEmbedding, d.embedding);
      if (score > bestScore) {
        bestScore = score;
        bestDoc = d;
      }
    }

    const answer = await queryLLM(question, bestDoc.text);
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
