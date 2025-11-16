import React, { useState, useEffect } from 'react';
import Note from './Note';

function NoteList({ notes, selectedCategory, deleteNote, editNote }) {

  const filteredNotes = selectedCategory === "All Notes"
    ? notes
    : notes.filter(note => note && note.category === selectedCategory);

  return (
    <div className="w-full">
      <div className="sticky w-full top-0 z-10 bg-gray-900 backdrop-blur-xl py-3 px-1 mb-4 border-b border-gray-700 text-center md:text-left">
        <h1 className="text-xl md:text-2xl font-bold text-gray-100">
          {selectedCategory} {filteredNotes.length > 0 && `(${filteredNotes.length})`}
        </h1>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12 px-4">
          <div className="max-w-md mx-auto p-6 bg-gray-700/50 rounded-lg shadow-sm">
            <p className="text-gray-100">
              No notes found{selectedCategory !== 'All Notes' ? ` in ${selectedCategory}` : ''}.
            </p>
            <p className="text-sm text-gray-200 mt-2">
              Create a new note to get started!
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredNotes.map(note => (
            <div key={note.id} className="h-full">
              <Note note={note} deleteNote={deleteNote} editNote={editNote} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default NoteList;
