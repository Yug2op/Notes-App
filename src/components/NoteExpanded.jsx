import React from 'react';
import { FaTimes, FaEdit, FaTrash } from 'react-icons/fa';

export default function NoteExpanded({ note, onClose, onEdit, onDelete, color }) {
  if (!note) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl p-6"
        style={{ backgroundColor: color }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          aria-label="Close"
        >
          <FaTimes className="h-5 w-5" />
        </button>

        {/* Note Content */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 break-words">
              {note.title}
            </h2>
            <div className="flex items-center space-x-3 text-sm text-gray-700">
              <span className="px-3 py-1 rounded-full bg-white/30 backdrop-blur-sm">
                {note.category}
              </span>
              <span>{new Date(note.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>

          <div className="prose max-w-none text-gray-800">
            {note.description.split('\n').map((paragraph, i) => (
              <p key={i} className="mb-4">
                {paragraph || <br />}
              </p>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 pt-4 border-t border-black/20 flex justify-end space-x-3">
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/30 hover:bg-white/40 text-gray-900 rounded-lg transition-colors"
          >
            <FaEdit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this note?')) {
                onDelete(note.id);
                onClose();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <FaTrash className="h-4 w-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
