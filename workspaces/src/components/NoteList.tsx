import React, { useState } from 'react';
import { Code, Terminal, Layers, Trash2, Archive, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { Note } from '../types';
import CodeBlock from './CodeBlock';

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: number) => void;
  onArchiveNote: (id: number) => void;
  onShareNote: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
  onArchiveNote,
  onShareNote,
}) => {
  const [expandedNotes, setExpandedNotes] = useState<number[]>([]);

  const getIcon = (type: Note['type']) => {
    switch (type) {
      case 'snippet':
        return <Code className="w-5 h-5 text-blue-500" />;
      case 'command':
        return <Terminal className="w-5 h-5 text-green-500" />;
      case 'component':
        return <Layers className="w-5 h-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const toggleExpand = (id: number) => {
    setExpandedNotes(prev =>
      prev.includes(id) ? prev.filter(noteId => noteId !== id) : [...prev, id]
    );
  };

  const renderNote = (note: Note) => {
    const isExpanded = expandedNotes.includes(note.id);

    return (
      <div
        key={note.id}
        className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all mb-4 ${
          selectedNote?.id === note.id
            ? 'ring-2 ring-indigo-500 dark:ring-indigo-400'
            : 'hover:shadow-lg'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getIcon(note.type)}
              <h3 className="font-semibold text-lg truncate">{note.title}</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => toggleExpand(note.id)}
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <button
                onClick={() => onShareNote(note.id)}
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onArchiveNote(note.id)}
                className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400"
              >
                <Archive className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDeleteNote(note.id)}
                className="text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          {isExpanded && (
            <div
              className="note-content text-gray-600 dark:text-gray-300 text-sm"
              onClick={() => onSelectNote(note)}
            >
              <CodeBlock content={note.content} />
            </div>
          )}
          <div className="mt-2 flex flex-wrap gap-1">
            {note.tags.map(tag => (
              <span key={tag} className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const columnCount = 3;
  const notesPerColumn = Math.ceil(notes.length / columnCount);

  return (
    <div className="flex space-x-4">
      {[...Array(columnCount)].map((_, columnIndex) => (
        <div key={columnIndex} className="flex-1">
          {notes.slice(columnIndex * notesPerColumn, (columnIndex + 1) * notesPerColumn).map(renderNote)}
        </div>
      ))}
    </div>
  );
};

export default NoteList;