import React, { useState, useEffect } from 'react';
import NoteGround from './NoteGround';
import CollapsibleSidebar from './CollapsibleSidebar';
import SearchModal from './SearchModal';
import SettingsModal from './SettingsModal';
import NewNoteModal from './NewNoteModal';
import { useNotes } from '../hooks/useNotes';

function App() {
  const {
    notes,
    archivedNotes,
    selectedNote,
    addNote,
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    setSelectedNote
  } = useNotes();

  const [darkMode, setDarkMode] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [newNoteModalOpen, setNewNoteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showArchived, setShowArchived] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredNotes = (showArchived ? archivedNotes : notes).filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const shareNote = (id: number) => {
    // Implement sharing functionality
    console.log(`Sharing note with id: ${id}`);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <main className="flex-grow flex bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <CollapsibleSidebar
          selectedNote={selectedNote}
          onUpdateNote={updateNote}
          onNewNote={() => setNewNoteModalOpen(true)}
          onSearch={() => setSearchModalOpen(true)}
          onToggleDarkMode={toggleDarkMode}
          onSettings={() => setSettingsModalOpen(true)}
          onToggleArchive={() => setShowArchived(!showArchived)}
          darkMode={darkMode}
          showArchived={showArchived}
        />
        <div className="flex-grow overflow-hidden">
          <NoteGround
            notes={filteredNotes}
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
            onDeleteNote={deleteNote}
            onArchiveNote={showArchived ? unarchiveNote : archiveNote}
            onShareNote={shareNote}
            onUpdateNote={updateNote}
          />
        </div>
      </main>
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSearch={setSearchTerm}
        darkMode={darkMode}
      />
      <SettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <NewNoteModal
        isOpen={newNoteModalOpen}
        onClose={() => setNewNoteModalOpen(false)}
        onAddNote={addNote}
      />
    </div>
  );
}

export default App;