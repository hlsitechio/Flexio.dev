import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Home, BarChart2, Settings, ChevronLeft, Folder, FileText, PlusCircle, Trash2 } from 'lucide-react';
import useDashboardStore from '../store/dashboardStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { folders, addFolder, addPage, removeFolder, removePage, reorderFolders, reorderPages } = useDashboardStore();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === 'folder') {
      reorderFolders(source.index, destination.index);
    } else if (type === 'page') {
      const [, folderId] = result.draggableId.split('-');
      reorderPages(folderId, source.index, destination.index);
    }
  };

  const sidebarClasses = `fixed inset-y-0 left-0 z-50 w-64 bg-card text-card-foreground shadow-lg transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0`;

  return (
    <>
      <div className={sidebarClasses}>
        {/* Sidebar content */}
        {/* ... (keep the existing sidebar content) */}
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose}></div>
      )}
    </>
  );
};

export default Sidebar;