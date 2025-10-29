import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUI";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard"; // 👈 Add this line
import { useState, useEffect } from "react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(true);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching Notes:", error);
        if (error?.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch notes");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
        
        {notes.length === 0 && !isRateLimited && <NotesNotFound /> }

        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes = {setNotes}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
// modale
export default HomePage;
