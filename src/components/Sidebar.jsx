import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

export default function Sidebar({ onCategoryChange, onAddClick }) {
    const [selectedCategory, setSelectedCategory] = useState("All Notes");
    const [isMobile, setIsMobile] = useState(false);

    const Categories = ['All Notes', 'Important', 'Ideas', 'Work', 'Personal', 'Other'];

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        onCategoryChange(cat);
    };

    return (
        <div className="h-full w-full p-4 flex flex-col text-white overflow-y-auto">
            <div className="mb-6 flex flex-col space-y-4">
                <h1 className="text-2xl font-bold">My Notes</h1>
                <button
                    onClick={onAddClick}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg active:scale-95"
                >
                    <FiPlus className="h-5 w-5" />
                    <span>New Note</span>
                </button>
            </div>

            {/* Category List */}
            <div className="flex-1 overflow-y-auto pr-1 -mr-2">
                <h2 className="text-xs uppercase font-semibold text-gray-400 mb-3 tracking-wider">
                    Categories
                </h2>
                <ul className="space-y-1">
                    {Categories.map((cat) => (
                        <li
                            key={cat}
                            className={`
                                px-3 py-2.5 rounded-lg transition-colors cursor-pointer
                                ${cat === selectedCategory
                                    ? 'bg-blue-600/90 text-white font-medium'
                                    : 'text-gray-200 hover:bg-gray-700/50 active:bg-gray-700/70'}
                            `}
                            onClick={() => handleCategoryClick(cat)}
                        >
                            {cat}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Only show on desktop */}
            {!isMobile && (
                <div className="mt-auto pt-4 border-t border-gray-700">
                    <p className="text-xs text-gray-400 text-center">
                        Notes App v1.0.0
                    </p>
                </div>
            )}
        </div>
    );
}