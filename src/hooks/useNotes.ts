import { useState, useEffect } from 'react';
import { Note } from '../types';
import Storage from '../utils/storage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([]);
  const [storedNotes, setStoredNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [categories, setCategories] = useState<string[]>(['snippet', 'command', 'component']);

  useEffect(() => {
    setNotes(Storage.getNotes());
    setArchivedNotes(Storage.getArchivedNotes());
    setStoredNotes(Storage.getStoredNotes());
    setCategories(Storage.getCategories());
  }, []);

  const addNote = (title: string, type: string, tags: string[]) => {
    const newNote: Note = {
      id: Date.now(),
      title,
      content: '',
      type,
      tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      archived: false,
    };
    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    Storage.saveNotes(updatedNotes);
    return newNote;
  };

  const updateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: new Date().toISOString() } : note
    );
    setNotes(updatedNotes);
    Storage.saveNotes(updatedNotes);
  };

  const deleteNote = (id: number) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    Storage.saveNotes(updatedNotes);
  };

  const archiveNote = (id: number) => {
    const noteToArchive = notes.find(note => note.id === id);
    if (noteToArchive) {
      const updatedNotes = notes.filter(note => note.id !== id);
      const updatedArchivedNotes = [...archivedNotes, { ...noteToArchive, archived: true }];
      setNotes(updatedNotes);
      setArchivedNotes(updatedArchivedNotes);
      Storage.saveNotes(updatedNotes);
      Storage.saveArchivedNotes(updatedArchivedNotes);
    }
  };

  const unarchiveNote = (id: number) => {
    const noteToUnarchive = archivedNotes.find(note => note.id === id);
    if (noteToUnarchive) {
      const updatedArchivedNotes = archivedNotes.filter(note => note.id !== id);
      const updatedNotes = [...notes, { ...noteToUnarchive, archived: false }];
      setArchivedNotes(updatedArchivedNotes);
      setNotes(updatedNotes);
      Storage.saveArchivedNotes(updatedArchivedNotes);
      Storage.saveNotes(updatedNotes);
    }
  };

  const storeNote = (id: number) => {
    const noteToStore = notes.find(note => note.id === id);
    if (noteToStore) {
      const updatedNotes = notes.filter(note => note.id !== id);
      const updatedStoredNotes = [...storedNotes, { ...noteToStore, stored: true }];
      setNotes(updatedNotes);
      setStoredNotes(updatedStoredNotes);
      Storage.saveNotes(updatedNotes);
      Storage.saveStoredNotes(updatedStoredNotes);
    }
  };

  const unstoreNote = (id: number) => {
    const noteToUnstore = storedNotes.find(note => note.id === id);
    if (noteToUnstore) {
      const updatedStoredNotes = storedNotes.filter(note => note.id !== id);
      const updatedNotes = [...notes, { ...noteToUnstore, stored: false }];
      setStoredNotes(updatedStoredNotes);
      setNotes(updatedNotes);
      Storage.saveStoredNotes(updatedStoredNotes);
      Storage.saveNotes(updatedNotes);
    }
  };

  const addCategory = (name: string) => {
    if (!categories.includes(name)) {
      const newCategories = [...categories, name];
      setCategories(newCategories);
      Storage.saveCategories(newCategories);
    }
  };

  const renameCategory = (oldName: string, newName: string) => {
    if (categories.includes(oldName) && !categories.includes(newName)) {
      const newCategories = categories.map(cat => cat === oldName ? newName : cat);
      setCategories(newCategories);
      Storage.saveCategories(newCategories);

      // Update notes with the new category name
      const updateNoteCategory = (note: Note) => {
        if (note.type === oldName) {
          return { ...note, type: newName };
        }
        return note;
      };

      setNotes(prevNotes => prevNotes.map(updateNoteCategory));
      setArchivedNotes(prevNotes => prevNotes.map(updateNoteCategory));
      setStoredNotes(prevNotes => prevNotes.map(updateNoteCategory));

      Storage.saveNotes(notes.map(updateNoteCategory));
      Storage.saveArchivedNotes(archivedNotes.map(updateNoteCategory));
      Storage.saveStoredNotes(storedNotes.map(updateNoteCategory));
    }
  };

  return {
    notes,
    archivedNotes,
    storedNotes,
    selectedNote,
    addNote,
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    storeNote,
    unstoreNote,
    setSelectedNote,
    categories,
    addCategory,
    renameCategory
  };
};