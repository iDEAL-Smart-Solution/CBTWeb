import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import { copyFileSync } from 'fs';

const isIIS = process.env.IS_IIS === 'true';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'copy-web-config',
      generateBundle() {
        if (isIIS) {
          const webConfigPath = resolve(__dirname, 'web.config');
          const distPath = resolve(__dirname, 'dist/web.config');
          try {
            copyFileSync(webConfigPath, distPath);
            console.log('✅ web.config copied to dist folder');
          } catch (error) {
            console.error('❌ Error copying web.config:', error);
          }
        }
      },
    },
  ],
  // 👇 IMPORTANT: use './' for IIS so assets load correctly
  base: isIIS ? './' : '/',
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
    minify: true,
    sourcemap: false,
  },
  server: {
    hmr: { overlay: false },
    fs: { allow: ['.'] },
  },
});
