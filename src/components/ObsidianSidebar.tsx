import React, { useState } from 'react';
import { Note } from '../types';
import { FileText, Search, Settings, Archive, Plus, Database, ChevronLeft, ChevronRight, Trash2, Sun, Moon } from 'lucide-react';

interface ObsidianSidebarProps {
  notes: Note[];
  archivedNotes: Note[];
  trashedNotes: Note[];
  onNewNote: () => void;
  onSearch: () => void;
  onSettings: () => void;
  onToggleArchive: () => void;
  onToggleTrash: () => void;
  onToggleStorage: () => void;
  showArchived: boolean;
  showTrash: boolean;
  showStorage: boolean;
  onCollapse: (collapsed: boolean) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const ObsidianSidebar: React.FC<ObsidianSidebarProps> = ({
  notes,
  archivedNotes,
  trashedNotes,
  onNewNote,
  onSearch,
  onSettings,
  onToggleArchive,
  onToggleTrash,
  onToggleStorage,
  showArchived,
  showTrash,
  showStorage,
  onCollapse,
  darkMode,
  onToggleDarkMode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    onCollapse(!isCollapsed);
  };

  return (
    <div className={`obsidian-sidebar flex flex-col h-full transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex justify-between items-center h-16 px-4 border-b border-gray-700">
        {!isCollapsed && <h1 className="text-xl font-bold text-gray-200">Flexio</h1>}
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="p-2">
          <SidebarButton icon={<Plus size={20} />} label="New Note" onClick={onNewNote} isCollapsed={isCollapsed} />
          <SidebarButton icon={<FileText size={20} />} label="All Notes" onClick={() => {}} isCollapsed={isCollapsed} active={!showArchived && !showTrash && !showStorage} />
          <SidebarButton icon={<Search size={20} />} label="Search" onClick={onSearch} isCollapsed={isCollapsed} />
          <SidebarButton icon={<Settings size={20} />} label="Settings" onClick={onSettings} isCollapsed={isCollapsed} />
          <SidebarButton icon={<Archive size={20} />} label="Archived" onClick={onToggleArchive} isCollapsed={isCollapsed} active={showArchived} />
          <SidebarButton icon={<Trash2 size={20} />} label="Trash" onClick={onToggleTrash} isCollapsed={isCollapsed} active={showTrash} />
          <SidebarButton icon={<Database size={20} />} label="Storage" onClick={onToggleStorage} isCollapsed={isCollapsed} active={showStorage} />
          <SidebarButton
            icon={darkMode ? <Sun size={20} /> : <Moon size={20} />}
            label={darkMode ? 'Light Mode' : 'Dark Mode'}
            onClick={onToggleDarkMode}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
    </div>
  );
};

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isCollapsed: boolean;
  active?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, onClick, isCollapsed, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full py-2 px-3 rounded-md transition-colors duration-200 mb-1
      ${active
        ? 'bg-blue-600 text-white'
        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
      }`}
  >
    <span className="mr-2">{icon}</span>
    {!isCollapsed && <span>{label}</span>}
  </button>
);

export default ObsidianSidebar;