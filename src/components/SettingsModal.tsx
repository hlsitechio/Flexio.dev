import React from 'react';
import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, darkMode, onToggleDarkMode }) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <span className="dark:text-white">Dark Mode</span>
          <label className="switch">
            <input type="checkbox" checked={darkMode} onChange={onToggleDarkMode} />
            <span className="slider round"></span>
          </label>
        </div>
        {/* Add more settings options here */}
      </div>
    </div>
  );
};

export default SettingsModal;