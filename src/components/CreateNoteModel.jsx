import { useState, useEffect, useRef } from "react";

export default function CreateNoteModal({ isOpen, onClose, onAddNote, noteToEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const inputRef = useRef(null);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || "");
      setDescription(noteToEdit.description || "");
      setCategory(noteToEdit.category || "Work");
    } else {
      setTitle("");
      setDescription("");
      setCategory("Work");
    }
  }, [noteToEdit, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const note = {
      id: noteToEdit?.id || Date.now().toString(),
      title,
      description,
      category,
      createdAt: noteToEdit?.createdAt || new Date().toISOString(),
    };
    onAddNote(note);
    onClose();
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500/70 flex items-center justify-center z-50">
      <div className="bg-gray-200 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {noteToEdit ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              ref={inputRef}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded h-24"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Important">Important</option>
              <option value="Ideas">Ideas</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {noteToEdit ? "Update" : "Add"} Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}