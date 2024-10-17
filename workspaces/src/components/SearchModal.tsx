import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (term: string) => void;
  darkMode: boolean;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch, darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const handleSearch = () => {
    onSearch(searchTerm);
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Search Notes</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
          className="w-full p-2 border rounded-md mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          autoFocus
        />
        <button
          onClick={handleSearch}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchModal;