import React, { useState, useEffect } from 'react';
import { Note } from '../types';
import CodeMirror from '@uiw/react-codemirror';
import { markdown } from '@codemirror/lang-markdown';
import { EditorView } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';

interface NoteEditorProps {
  note: Note | null;
  onUpdateNote: (note: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdateNote }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setContent(note.content);
    }
  }, [note]);

  const handleChange = (value: string) => {
    setContent(value);
    if (note) {
      onUpdateNote({ ...note, content: value });
    }
  };

  if (!note) {
    return <div className="text-center text-gray-500">Select a note to edit</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <input
        type="text"
        value={note.title}
        onChange={(e) => onUpdateNote({ ...note, title: e.target.value })}
        className="bg-transparent border-b border-gray-700 text-xl font-bold mb-4 p-2 focus:outline-none focus:border-accent"
      />
      <CodeMirror
        value={content}
        height="100%"
        extensions={[markdown(), EditorView.lineWrapping]}
        onChange={handleChange}
        className="flex-grow rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent"
        theme={oneDark}
      />
    </div>
  );
};

export default NoteEditor;