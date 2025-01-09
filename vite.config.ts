import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Define a pasta de saída como 'build'
  },
  base: '/react-todoList/', // Necessário para o GitHub Pages
});
