import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: 'src/index.jsx',
      formats: ['es'],
      fileName: 'datadance-ui',
    },
    cssCodeSplit: false,
    rollupOptions: {
      external: (id) => /^react(?:\/|$)/.test(id)
        || /^react-dom(?:\/|$)/.test(id)
        || /^lucide-react(?:\/|$)/.test(id),
      output: {
        assetFileNames: (assetInfo) => assetInfo.name?.endsWith('.css')
          ? 'datadance-ui.css'
          : 'assets/[name]-[hash][extname]',
      },
    },
  },
});
