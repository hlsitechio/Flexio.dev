import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (title: string, type: 'snippet' | 'command' | 'component', tags: string[]) => void;
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({ isOpen, onClose, onAddNote }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'snippet' | 'command' | 'component'>('snippet');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddNote(title.trim(), type, tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''));
      setTitle('');
      setType('snippet');
      setTags('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-background p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text">New Note</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="w-full p-2 mb-4 bg-background text-text border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            autoFocus
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'snippet' | 'command' | 'component')}
            className="w-full p-2 mb-4 bg-background text-text border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="snippet">Snippet</option>
            <option value="command">Command</option>
            <option value="component">Component</option>
          </select>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags (comma-separated)..."
            className="w-full p-2 mb-4 bg-background text-text border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewNoteModal;