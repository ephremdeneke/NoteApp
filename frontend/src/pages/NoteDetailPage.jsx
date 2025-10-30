import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LoaderIcon, Trash2Icon, ArrowBigLeftIcon } from "lucide-react";
import api from "../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // ✅ Fetch note details
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);
  console.log({note});
  
  // ✅ Delete note
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  // ✅ Save updated note
  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost mb-6 flex items-center gap-2">
              <ArrowBigLeftIcon className="size-5" /> Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5" /> Delete Note
            </button>
          </div>

          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
