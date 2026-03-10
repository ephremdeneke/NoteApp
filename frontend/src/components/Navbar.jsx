import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="max-auto max-w-6xL p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-momo tracking-tight">
            Random-T-hought
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/create" className="btn btn-primary btn-sm">
              <PlusIcon className="size-6" />
              <span>New Thought</span>
            </Link>
            <button
              type="button"
              className="btn btn-outline btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;