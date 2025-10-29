import { Notebook, NotebookIcon } from "lucide-react";
import { Link } from "react-router";
const NotesNotFound = () => {
  return (
    <div className=" flex flex-cols items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
        <div className =" bg-primary/10 round-full p-8">
        <NotebookIcon className=" size-10 text-primary" />
        <h3 className="text-2xl font-bold">No notes yet </h3>
        <p className = "text-base-content/70">
            Ready to organize your thought? Create your first note started on journey.
        </p>
        <Link to="/create" className ="btn btn-primary">
            Create Your First Note!
        </Link>
            </div>
        

    </div>
  );
};

export default NotesNotFound;