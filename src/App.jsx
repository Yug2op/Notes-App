import NoteList from "./components/NoteList";
import Sidebar from "./components/Sidebar";
import CreateNoteModal from "./components/CreateNoteModel";
import { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';

function App() {
    const [selectedCategory, setSelectedCategory] = useState("All Notes");
    const [notes, setNotes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        try {
            const storedNotes = localStorage.getItem("notes");
            if (storedNotes) {
                const parsedNotes = JSON.parse(storedNotes);
                setNotes(Array.isArray(parsedNotes) ? parsedNotes : []);
            }
        } catch (err) {
            console.error("Error reading notes from localStorage:", err);
            setError("Failed to load notes. Please refresh the page.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const getUniqueTitle = (title) => {
        let newTitle = title;
        let count = 1;

        while (notes.some(note => note.title === newTitle)) {
            newTitle = `${title} (${count})`;
            count++;
        }

        return newTitle;
    };

    const addNote = (note) => {
        const noteWithUniqueTitle = {
            ...note,
            title: getUniqueTitle(note.title)
        };
        const updated = [...notes, noteWithUniqueTitle];
        setNotes(updated);
        localStorage.setItem("notes", JSON.stringify(updated));
    };

    const updateNote = (updatedNote) => {
        const updatedNotes = notes.map(note =>
            note.id === updatedNote.id ? { ...note, ...updatedNote } : note
        );
        setNotes(updatedNotes);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));
    };

    const deleteNote = (id) => {
        const updated = notes.filter(note => note.id !== id);
        setNotes(updated);
        localStorage.setItem("notes", JSON.stringify(updated));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen  bg-gray-900">
            {/* Mobile menu button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
                aria-label="Toggle menu"
            >
                <FiMenu className="h-6 w-6" />
            </button>

            {/* Sidebar */}
            <div className={`fixed md:static inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 bg-gray-800 h-screen`}>
                <Sidebar
                    onCategoryChange={(category) => {
                        setSelectedCategory(category);
                        if (window.innerWidth < 768) {
                            setIsSidebarOpen(false);
                        }
                    }}
                    onAddClick={() => {
                        setIsModalOpen(true);
                        if (window.innerWidth < 768) {
                            setIsSidebarOpen(false);
                        }
                    }}
                />
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/80 z-30 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Main content */}
            <div className="flex-1 p-4 mt-12 md:mt-0">
                <NoteList
                    notes={notes}
                    selectedCategory={selectedCategory}
                    deleteNote={deleteNote}
                    editNote={updateNote}
                />
            </div>
            <CreateNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddNote={addNote}
            />
        </div>
    );
}

export default App;
