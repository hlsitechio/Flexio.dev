import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Note } from '../types';
import NoteCard from './NoteCard';
import { Plus, Edit2 } from 'lucide-react';

interface NoteGroundProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: number) => void;
  onArchiveNote: (id: number) => void;
  onShareNote: (id: number) => void;
  onUpdateNote: (updatedNote: Note) => void;
  onStoreNote: (id: number) => void;
  currentFolder: string;
  darkMode: boolean;
  categories: string[];
  onAddCategory: (name: string) => void;
  onRenameCategory: (oldName: string, newName: string) => void;
}

const NoteGround: React.FC<NoteGroundProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  onDeleteNote,
  onArchiveNote,
  onShareNote,
  onUpdateNote,
  onStoreNote,
  currentFolder,
  darkMode,
  categories,
  onAddCategory,
  onRenameCategory,
}) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [columns, setColumns] = useState(categories);

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setColumns([...columns, newCategoryName.trim()]);
      setNewCategoryName('');
    }
  };

  const handleRenameCategory = (category: string) => {
    if (editedCategoryName.trim() && editedCategoryName !== category) {
      onRenameCategory(category, editedCategoryName.trim());
      setColumns(columns.map(col => col === category ? editedCategoryName.trim() : col));
      setEditingCategory(null);
      setEditedCategoryName('');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) {
      return;
    }

    if (type === 'COLUMN') {
      const newColumns = Array.from(columns);
      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);
      setColumns(newColumns);
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const noteToMove = notes.find(note => note.id.toString() === result.draggableId);
    if (noteToMove) {
      const updatedNote = { ...noteToMove, type: destination.droppableId };
      onUpdateNote(updatedNote);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex space-x-4 min-w-max p-6 bg-gray-900 overflow-x-auto"
          >
            {columns.map((category, index) => (
              <Draggable key={category} draggableId={category} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      {...provided.dragHandleProps}
                      className="bg-gray-800 p-4 rounded-lg w-80"
                    >
                      <div className="flex justify-between items-center mb-4">
                        {editingCategory === category ? (
                          <input
                            type="text"
                            value={editedCategoryName}
                            onChange={(e) => setEditedCategoryName(e.target.value)}
                            onBlur={() => handleRenameCategory(category)}
                            onKeyPress={(e) => e.key === 'Enter' && handleRenameCategory(category)}
                            className="bg-gray-700 text-white px-2 py-1 rounded"
                            autoFocus
                          />
                        ) : (
                          <h2 className="text-xl font-semibold text-gray-200 capitalize">{category}</h2>
                        )}
                        <button
                          onClick={() => {
                            setEditingCategory(category);
                            setEditedCategoryName(category);
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                      <Droppable droppableId={category} type="NOTE">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="space-y-4 min-h-[200px]"
                          >
                            {notes
                              .filter((note) => note.type === category)
                              .map((note, index) => (
                                <Draggable key={note.id} draggableId={note.id.toString()} index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                        opacity: snapshot.isDragging ? 0.5 : 1,
                                      }}
                                    >
                                      <NoteCard
                                        note={note}
                                        index={index}
                                        isSelected={selectedNote?.id === note.id}
                                        onSelect={() => onSelectNote(note)}
                                        onDelete={() => onDeleteNote(note.id)}
                                        onArchive={() => onArchiveNote(note.id)}
                                        onShare={() => onShareNote(note.id)}
                                        onUpdateNote={onUpdateNote}
                                        onStore={() => onStoreNote(note.id)}
                                        isArchived={currentFolder === 'archived'}
                                        isStored={currentFolder === 'storage'}
                                        darkMode={darkMode}
                                      />
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <div className="bg-gray-800 p-4 rounded-lg w-80">
              <h2 className="text-xl font-semibold text-gray-200 mb-4">Add New Category</h2>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="New category name"
                  className="bg-gray-700 text-white px-2 py-1 rounded flex-grow"
                />
                <button
                  onClick={handleAddCategory}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default NoteGround;