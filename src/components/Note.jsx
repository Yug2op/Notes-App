import React, { useState, useMemo, useCallback } from 'react';
import { format } from 'date-fns';
import { FaTrash, FaEdit } from 'react-icons/fa';
import EditNoteModal from './EditNoteModal';
import NoteExpanded from './NoteExpanded';
import { getColorFromString } from '../utils/colors';

function Note({ note, deleteNote, editNote }) {
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const [isExpanded, setIsExpanded] = useState(false);
   const date = new Date(note.createdAt);
   const formattedDate = format(date, 'yyyy-MM-dd');

   const handleEditClick = (e) => {
      e.stopPropagation();
      setIsEditModalOpen(true);
   };

   const handleSaveEdit = (updatedNote) => {
      editNote(updatedNote);
      setIsEditModalOpen(false);
   };

   const handleDelete = (e) => {
      e.stopPropagation();
      if (window.confirm('Are you sure you want to delete this note?')) {
         deleteNote(note.id);
      }
   };

   const noteColor = useMemo(() => getColorFromString(note.title), [note.title]);
   const title = note.title.charAt(0).toUpperCase() + note.title.slice(1);

   const toggleExpanded = useCallback((e) => {
      // Don't toggle if clicking on buttons
      if (e.target.closest('button')) return;
      setIsExpanded(prev => !prev);
   }, []);

   return (
      <>
         <div
            className="p-4 rounded-lg shadow hover:shadow-md border transition-colors duration-200 h-full flex flex-col cursor-pointer"
            style={{ backgroundColor: noteColor }}
            onClick={toggleExpanded}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleExpanded(e)}
         >
            <div className="flex-1">
               {/* Title */}
               <h3 className="font-semibold text-lg mb-2 text-gray-900 break-words">
                  {title}
               </h3>

               {/* Description */}
               <p className="text-gray-700 text-sm line-clamp-3 break-words">
                  {note.description}
               </p>
            </div>

            {/* Footer Row */}
            <div className="flex justify-between items-center mt-4 gap-2">
               {/* Category Badge */}
               <span className="text-xs px-2 py-1 rounded bg-white/30 backdrop-blur-sm">
                  {note.category}
               </span>

               {/* Timestamp */}
               <span className="text-xs text-gray-500 whitespace-nowrap">
                  {formattedDate}
               </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-2 pt-3 border-t border-black/20">
               <button
                  onClick={handleEditClick}
                  className="text-blue-700 hover:text-blue-800 text-sm flex items-center gap-1.5 bg-white/30 hover:bg-white/40 px-3 py-2 rounded transition-colors active:scale-95 min-w-[80px] justify-center"
                  aria-label="Edit note"
               >
                  <FaEdit className="h-4 w-4" />
                  <span>Edit</span>
               </button>

               <button
                  onClick={handleDelete}
                  className="text-red-700 hover:text-red-800 text-sm flex items-center gap-1.5 bg-white/30 hover:bg-white/40 px-3 py-2 rounded transition-colors active:scale-95 min-w-[80px] justify-center"
                  aria-label="Delete note"
               >
                  <FaTrash className="h-4 w-4" />
                  <span>Delete</span>
               </button>
            </div>
         </div>

         <EditNoteModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveEdit}
            note={{
               ...note,
               style: { backgroundColor: noteColor }
            }}
         />

         {isExpanded && (
            <NoteExpanded
               note={note}
               color={noteColor}
               onClose={() => setIsExpanded(false)}
               onEdit={() => setIsEditModalOpen(true)}
               onDelete={deleteNote}
            />
         )}
      </>
   );
}

export default Note;
