import fs from "fs";
import { getEmbeddings } from "../utils/embeddings.js";

let documents = [];

/**
 * ✅ Dynamically import pdf-parse to avoid default export issue
 */
export const uploadDocument = async (req, res) => {
  try {
    const { default: pdf } = await import("pdf-parse"); // <-- FIXED LINE
    const fileBuffer = fs.readFileSync(req.file.path);
    const data = await pdf(fileBuffer);
    const text = data.text;
    const embedding = await getEmbeddings(text);

    documents.push({ name: req.file.originalname, text, embedding });

    console.log(`✅ Uploaded and processed: ${req.file.originalname}`);
    res.json({ message: "✅ File uploaded and processed successfully" });
  } catch (err) {
    console.error("❌ Error in uploadDocument:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getAllDocs = () => documents;
