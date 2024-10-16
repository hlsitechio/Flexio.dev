import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          codemirror: ['@uiw/react-codemirror', '@codemirror/lang-markdown', '@codemirror/theme-one-dark'],
        },
      },
      external: [
        '/src/main.tsx',
        /^node:.*/,
      ],
    },
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    include: ['react-error-boundary', 'netlify-identity-widget'],
  },
});