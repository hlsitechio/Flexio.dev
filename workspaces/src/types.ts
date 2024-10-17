export interface Note {
  id: number;
  title: string;
  content: string;
  type: 'snippet' | 'command' | 'component';
  tags: string[];
  createdAt: string;
  updatedAt: string;
  archived: boolean;
  color?: string;
}