import React from 'react';
import Icons from './Icons';
import NoteEditor from './NoteEditor';
import { Note } from '../types';

interface SidebarProps {
  selectedNote: Note | null;
  onUpdateNote: (note: Note) => void;
  onNewNote: () => void;
  onSearch: () => void;
  onToggleDarkMode: () => void;
  onSettings: () => void;
  onToggleArchive: () => void;
  darkMode: boolean;
  showArchived: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedNote,
  onUpdateNote,
  onNewNote,
  onSearch,
  onToggleDarkMode,
  onSettings,
  onToggleArchive,
  darkMode,
  showArchived,
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <button onClick={onNewNote} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Icons.PlusCircle className="w-6 h-6" />
        </button>
        <button onClick={onSearch} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Icons.Search className="w-6 h-6" />
        </button>
        <button onClick={onToggleDarkMode} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          {darkMode ? <Icons.Sun className="w-6 h-6" /> : <Icons.Moon className="w-6 h-6" />}
        </button>
        <button onClick={onSettings} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <Icons.Settings className="w-6 h-6" />
        </button>
        <button
          onClick={onToggleArchive}
          className={`text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${
            showArchived ? 'text-indigo-600 dark:text-indigo-400' : ''
          }`}
        >
          <Icons.Archive className="w-6 h-6" />
        </button>
        <div className="text-gray-600 dark:text-gray-300">
          <Icons.Storage className="w-6 h-6" />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto p-6">
        <NoteEditor note={selectedNote} onUpdateNote={onUpdateNote} />
      </div>
    </div>
  );
};

export default Sidebar;