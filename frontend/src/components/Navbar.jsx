import React from 'react';
import { Link } from 'react-router';
import { PlusIcon } from 'lucide-react';

const Navbar = () => {
  return (
    <header className = "bg-base-300 border-b border-base-content/10">
    <div className= "max-auto max-w-6xL p-4" >
        <div className = "flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary font-momo tracking-tight">  NoteApp </h1>
            <div className="flex item-center gap-4">
            <Link to = "/create" className = "btn btn-primary btn-sm">
            <PlusIcon className= "size-6" />
            <span> New Note</span>
            </Link>
            </div>
        </div>
    </div> 
    </header>
  )
}
export default Navbar