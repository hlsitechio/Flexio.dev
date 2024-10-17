import React from 'react';
import { Note } from '../types';
import NoteCard from './NoteCard';

interface NoteGroundColumnsProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: number) => void;
  onArchiveNote: (id: number) => void;
  onShareNote: (id: number) => void;
  onUpdateNote: (updatedNote: Note) => void;
}

const NoteGroundColumns: React.FC<NoteGroundColumnsProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
  onArchiveNote,
  onShareNote,
  onUpdateNote,
}) => {
  const columns = [
    { type: 'snippet', title: 'Code Snippets' },
    { type: 'command', title: 'Commands' },
    { type: 'component', title: 'Components' },
  ];

  const renderColumn = (columnType: string, columnTitle: string) => {
    const filteredNotes = notes.filter(note => note.type === columnType);
    return (
      <div key={columnType} className="flex-1 min-w-[250px] p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mr-4 last:mr-0">
        <h2 className="text-lg font-semibold mb-4">{columnTitle}</h2>
        <div className="space-y-4">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              isSelected={selectedNote?.id === note.id}
              onSelect={() => onSelectNote(note)}
              onDelete={() => onDeleteNote(note.id)}
              onArchive={() => onArchiveNote(note.id)}
              onShare={() => onShareNote(note.id)}
              onUpdateNote={onUpdateNote}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-grow p-6 bg-white dark:bg-gray-900 overflow-auto">
      <div className="flex space-x-4">
        {columns.map(column => renderColumn(column.type, column.title))}
      </div>
    </div>
  );
};

export default NoteGroundColumns;