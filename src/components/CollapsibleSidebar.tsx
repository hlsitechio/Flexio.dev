import React, { useState } from 'react';
import { 
  PlusCircle, 
  Search, 
  Moon, 
  Sun, 
  Settings, 
  Archive,
  FileText,
  ChevronLeft,
  ChevronRight,
  Database
} from 'lucide-react';
import { Note } from '../types';

interface CollapsibleSidebarProps {
  selectedNote: Note | null;
  onUpdateNote: (note: Note) => void;
  onNewNote: () => void;
  onSearch: () => void;
  onToggleDarkMode: () => void;
  onSettings: () => void;
  onFolderChange: (folder: string) => void;
  darkMode: boolean;
  currentFolder: string;
}

const CollapsibleSidebar: React.FC<CollapsibleSidebarProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`bg-gray-900 text-gray-300 flex flex-col transition-all duration-300 ease-in-out ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between p-4 h-16 border-b border-gray-700">
        <h2 className={`text-lg font-semibold ${isCollapsed ? 'hidden' : ''}`}>Flexio.dev</h2>
        <button
          onClick={toggleCollapse}
          className="text-gray-400 hover:text-gray-200 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
      </div>
      <div className="flex flex-col flex-grow">
        <SidebarButton icon={<PlusCircle />} label="New Note" onClick={props.onNewNote} isCollapsed={isCollapsed} />
        <SidebarButton 
          icon={<FileText />} 
          label="All Notes" 
          onClick={() => props.onFolderChange('all')} 
          isCollapsed={isCollapsed}
          isActive={props.currentFolder === 'all'}
        />
        <SidebarButton icon={<Search />} label="Search" onClick={props.onSearch} isCollapsed={isCollapsed} />
        <SidebarButton 
          icon={props.darkMode ? <Sun /> : <Moon />} 
          label={props.darkMode ? "Light Mode" : "Dark Mode"} 
          onClick={props.onToggleDarkMode} 
          isCollapsed={isCollapsed} 
        />
        <SidebarButton icon={<Settings />} label="Settings" onClick={props.onSettings} isCollapsed={isCollapsed} />
        <div className="border-t border-gray-700 my-2"></div>
        <SidebarButton 
          icon={<Archive />} 
          label="Archives" 
          onClick={() => props.onFolderChange('archived')} 
          isCollapsed={isCollapsed}
          isActive={props.currentFolder === 'archived'}
        />
        <SidebarButton 
          icon={<Database />} 
          label="Storage" 
          onClick={() => props.onFolderChange('storage')} 
          isCollapsed={isCollapsed}
          isActive={props.currentFolder === 'storage'}
        />
      </div>
    </div>
  );
};

interface SidebarButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  isCollapsed: boolean;
  isActive?: boolean;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ icon, label, onClick, isCollapsed, isActive }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full py-2 px-4 text-left hover:bg-gray-800 transition-colors ${isActive ? 'bg-gray-800' : ''}`}
    title={label}
  >
    <span className="inline-block w-6 h-6">{icon}</span>
    {!isCollapsed && <span className="ml-3 text-sm">{label}</span>}
  </button>
);

export default CollapsibleSidebar;