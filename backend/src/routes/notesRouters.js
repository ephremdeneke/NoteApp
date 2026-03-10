import express from "express";
import {
  getAllNotes,
  getAllNotesId,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/notesController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all notes routes with auth middleware
router.use(authMiddleware);

router.get("/", getAllNotes);
router.get("/:id", getAllNotesId);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;