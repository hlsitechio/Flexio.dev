import { Note } from '../types';

class Storage {
  private static NOTES_KEY = 'flexio_notes';
  private static ARCHIVED_NOTES_KEY = 'flexio_archived_notes';
  private static STORED_NOTES_KEY = 'flexio_stored_notes';
  private static CATEGORIES_KEY = 'flexio_categories';

  private static getItem(key: string): any {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving ${key} from localStorage:`, error);
      return null;
    }
  }

  private static setItem(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  }

  static getNotes(): Note[] {
    return this.getItem(this.NOTES_KEY) || [];
  }

  static getArchivedNotes(): Note[] {
    return this.getItem(this.ARCHIVED_NOTES_KEY) || [];
  }

  static getStoredNotes(): Note[] {
    return this.getItem(this.STORED_NOTES_KEY) || [];
  }

  static getCategories(): string[] {
    return this.getItem(this.CATEGORIES_KEY) || ['snippet', 'command', 'component'];
  }

  static saveNotes(notes: Note[]): void {
    this.setItem(this.NOTES_KEY, notes);
  }

  static saveArchivedNotes(archivedNotes: Note[]): void {
    this.setItem(this.ARCHIVED_NOTES_KEY, archivedNotes);
  }

  static saveStoredNotes(storedNotes: Note[]): void {
    this.setItem(this.STORED_NOTES_KEY, storedNotes);
  }

  static saveCategories(categories: string[]): void {
    this.setItem(this.CATEGORIES_KEY, categories);
  }
}

export default Storage;