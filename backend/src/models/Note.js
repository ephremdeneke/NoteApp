import mongoose from "mongoose";

// 1 create s shema 
// 2 model based off of that schema 

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
// model 
const Note = mongoose.model("Note", noteSchema);
export default Note;