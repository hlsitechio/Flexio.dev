import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import useDashboardStore from '../store/dashboardStore';
import GridLayout from '../components/GridLayout';

const Dashboard: React.FC = () => {
  const { folderId, pageId } = useParams<{ folderId?: string; pageId?: string }>();
  const { folders, currentFolderId, currentPageId, setCurrentFolder, setCurrentPage, addWidget } = useDashboardStore();

  useEffect(() => {
    if (folderId) setCurrentFolder(folderId);
    if (pageId) setCurrentPage(pageId);
  }, [folderId, pageId, setCurrentFolder, setCurrentPage]);

  const currentFolder = folders.find((folder) => folder.id === (folderId || currentFolderId));
  const currentPage = currentFolder?.pages.find((page) => page.id === (pageId || currentPageId));

  const handleAddWidget = () => {
    if (currentPage) {
      addWidget(currentPage.id, {
        title: 'New Widget',
        content: 'Widget content',
        type: 'text',
        x: 0,
        y: 0,
        w: 3,
        h: 2,
      });
    }
  };

  if (!currentFolder || !currentPage) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard</h2>
        <p className="text-muted-foreground mb-4">Select a folder and page from the sidebar to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{currentPage.title}</h1>
        <button
          onClick={handleAddWidget}
          className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors"
        >
          <PlusCircle size={20} />
          <span>Add Widget</span>
        </button>
      </div>
      <GridLayout pageId={currentPage.id} widgets={currentPage.widgets} />
    </div>
  );
};

export default Dashboard;