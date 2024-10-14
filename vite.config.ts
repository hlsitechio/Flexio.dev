import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@hello-pangea/dnd'],
          codemirror: ['@uiw/react-codemirror', '@codemirror/lang-markdown', '@codemirror/theme-one-dark'],
        },
      },
    },
  },
});