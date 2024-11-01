// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,
//   },
// })






















// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import { resolve } from 'path';
// import { copyFileSync } from 'fs';

// export default defineConfig({
//   plugins: [react()],
//   base: './',
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//     rollupOptions: {
//       output: {
//         entryFileNames: 'assets/[name]-[hash].js',
//         chunkFileNames: 'assets/[name]-[hash].js',
//         assetFileNames: 'assets/[name]-[hash].[ext]',
//       },
//     },
//     emptyOutDir: true,
//   },
//   // Vite hook to copy web.config after build
//   buildEnd() {
//     const webConfigPath = resolve(__dirname, 'web.config');
//     const distPath = resolve(__dirname, 'dist/web.config');
//     try {
//       copyFileSync(webConfigPath, distPath);
//       console.log('web.config copied to dist folder');
//     } catch (error) {
//       console.error('Error copying web.config:', error);
//     }
//   }
// });































import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-web-config', // Plugin name
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
    },
    emptyOutDir: true,
  },
  server: {
    hmr: {
      overlay: false, // Disables Vite's overlay in development
    },
  },
});
