import express from "express";
import multer from "multer";
import { uploadDocument } from "../controllers/uploadController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), uploadDocument);

export default router;
