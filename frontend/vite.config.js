import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Import PostCSS plugin if needed
import discardUnused from 'postcss-discard-unused';

export default defineConfig({
  plugins: [react()],
  
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  build: {
    outDir: 'build', // Set the output directory to 'build'
  },
  
  css: {
    postcss: {
      plugins: [
        discardUnused({
          keyframes: false,
          // Additional options if needed
        }),
      ],
    },
  },
});
