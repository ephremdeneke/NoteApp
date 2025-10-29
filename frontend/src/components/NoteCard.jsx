import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/Utils";
import api from "../lib/axios";
import { toast } from "react-hot-toast";



const NoteCard = ({ note, setNotes }) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();
        if(!window.confirm("Are you sure you want to delete this note?")) return;
        
        try {
            await api.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id))
            toast.success("Note deleted successfully!");

        }
        catch(error){
              console.log("Error in handleDelete", error);
              toast.error("Failed to delete note");
        }
    }
  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-200 shadow-md hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]"
    >
      <div className="card-body">
        <h2 className="card-title text-lg font-bold text-primary">{note.title}</h2>
        <p className="text-sm text-base-content/70 line-clamp-4">{note.content}</p>
        <span className="text-xs text-base-content/60">
          {formatDate(new Date(note.createdAt))}
        </span>
        <div className="flex justify-end mt-3">
          <PenSquareIcon className="size-4 text-base-content/70 cursor-pointer" />
          <button className="size-4 text-red-500 ml-4 cursor-pointer " onClick = {(e) => handleDelete(e, note._id)}>
            <Trash2Icon className = "size-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
