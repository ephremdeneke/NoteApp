// Note-app/backend/src/controllers/notesController.js exported functions to handle notes operations
import Note from "../models/Note.js";



// 

      export async function getAllNotes (req, res) {

      try {
      const notes = await Note.find()
        .populate("user", "username email")
        .sort({ createdAt: -1 }); // fetch all notes, newest first
      res.status(200).json(notes);
      } catch(error){
      console.error("Error fetching notes:", error);
      res.status(500).json({ message: "Server error while fetching notes"});
      }
      }

      export async function getAllNotesId(req, res) {
        try {
          const note = await Note.findById(req.params.id).populate(
            "user",
            "username email"
          );
          if (!note) {
            return res.status(404).json({ message: "Note not found!" });
          }
          res.status(200).json(note);
        } catch (error) {
          console.error("Error fetching note by ID:", error);
          res.status(500).json({ message: "Server error", error });
        }
      }


export async function createNote(req, res) {
        try{
                const { title, content } = req.body; // destructure title and content from request body
                const newNote = new Note({title, content, user: req.user.id}); // create a new Note instance tied to the logged-in user

                await newNote.save(); // save the new note to the database
                res.status(201).json({message:"Note created successfully!"});
        }  catch(error){
                console.error("Error creating note:", error);
                res.status(500).json({ message: "Server error while creating note"});
        }
}
export async function updateNote(req, res){
   try{
        const { title, content } = req.body;
        const updated = await Note.findOneAndUpdate(
          { _id: req.params.id, user: req.user.id },
          { title, content },
          { new: true }
        );
        if (!updated) {
          return res.status(404).json({ message: "Note not found!" });
        }
        res.status(200).json({ message: "Note updated successfully!", note: updated });
   } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Server error while updating note" });
   }
}

export async function deleteNote(req, res){
   try {
        const deleted = await Note.findOneAndDelete({
          _id: req.params.id,
          user: req.user.id,
        });
        if (!deleted) {
          return res.status(404).json({ message: "Note not found!" });
        }
        res.status(200).json({ message: "Note deleted successfully!" });
   } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Server error while deleting note" });
   }
}

//export default Note;