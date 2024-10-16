import React, { useState } from 'react';
import { Note } from '../types';
import { Code, Terminal, Layers, Trash2, Archive, Share2, ChevronDown, ChevronUp, Edit, Database, Palette } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight } from '@uiw/codemirror-theme-github';

interface NoteCardProps {
  note: Note;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onArchive: () => void;
  onShare: () => void;
  onUpdateNote: (updatedNote: Note) => void;
  onStore: () => void;
  isArchived?: boolean;
  isStored?: boolean;
  darkMode: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  index,
  isSelected,
  onSelect,
  onDelete,
  onArchive,
  onShare,
  onUpdateNote,
  onStore,
  isArchived,
  isStored,
  darkMode,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleContentChange = (value: string) => {
    setEditedContent(value);
    onUpdateNote({ ...note, content: value });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateNote({ ...note, title: e.target.value });
  };

  const handleColorChange = (color: string) => {
    onUpdateNote({ ...note, color });
    setShowColorPicker(false);
  };

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

  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getIcon(note.type)}
            {isEditing ? (
              <input
                type="text"
                value={note.title}
                onChange={handleTitleChange}
                className="bg-gray-700 text-white px-2 py-1 rounded"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <h3 className="text-lg font-semibold text-white truncate">{note.title}</h3>
            )}
          </div>
          <div className="flex space-x-1">
            <button
              onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
              className="text-gray-400 hover:text-white"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {!isArchived && !isStored && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setIsEditing(!isEditing); }}
                  className="text-gray-400 hover:text-white"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setShowColorPicker(!showColorPicker); }}
                  className="text-gray-400 hover:text-white"
                >
                  <Palette className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onShare(); }}
                  className="text-gray-400 hover:text-white"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onArchive(); }}
                  className="text-gray-400 hover:text-white"
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onStore(); }}
                  className={`text-gray-400 hover:text-white ${isStored ? 'text-blue-500' : ''}`}
                >
                  <Database className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-gray-400 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4">
            <CodeMirror
              value={editedContent}
              height="200px"
              extensions={[markdown()]}
              onChange={handleContentChange}
              theme={darkMode ? oneDark : githubLight}
              className="rounded-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
        {showColorPicker && (
          <div className="mt-4 flex space-x-2">
            {['#ffffff', '#f0f0f0', '#e0e0e0', '#d0d0d0', '#c0c0c0'].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border border-gray-600"
                style={{ backgroundColor: color }}
                onClick={(e) => { e.stopPropagation(); handleColorChange(color); }}
              />
            ))}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-1">
          {note.tags.map(tag => (
            <span key={tag} className="bg-gray-700 text-gray-300 px-2 py-1 rounded-full text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoteCard;