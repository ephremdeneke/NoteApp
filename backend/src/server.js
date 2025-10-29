// backend/src/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRouters from "./routes/notesRouters.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();
const app = express();

// ✅ Enable CORS for React frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Apply rate limiter (Upstash or fallback)
app.use(rateLimiter);

// ✅ Connect to MongoDB
connectDB();

// ✅ Routes
app.use("/api/notes", notesRouters);

// ✅ Global error handler (optional but helpful)
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port: ${PORT}`));
