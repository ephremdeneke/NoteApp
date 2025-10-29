import React from 'react';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';  
 
function App() {
  return (
    <div data-theme = " coffee ">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="note/:id" element={<NoteDetailPage />} />
      </Routes>
     <footer className="bg-base-200 text-center py-4 mt-10 border-t border-base-300">
      <p className="text-sm text-base-content/70">
        © 2025 Ephrem Deneke. All rights reserved.
      </p>
    </footer>
    </div>
 
  )
}

export default App
// npm i axois
// npm i lucied-react 