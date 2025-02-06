import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-web-config', 
      generateBundle() {
        const webConfigPath = resolve(__dirname, 'web.config');
        const distPath = resolve(__dirname, 'dist/web.config');
        try {
          copyFileSync(webConfigPath, distPath);
          console.log('web.config copied to dist folder');
        } catch (error) {
          console.error('Error copying web.config:', error);
        }
      },
    },
  ],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      treeshake: false, 
    },
    emptyOutDir: true,
    minify: false, 
  },
  server: {
    hmr: {
      overlay: false, 
    },
    historyApiFallback: true,
  },
});
