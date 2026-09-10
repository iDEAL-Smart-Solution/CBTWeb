// vite.config.js
import { defineConfig } from "file:///C:/Users/DELL/Desktop/CBT/CBTWeb/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/DELL/Desktop/CBT/CBTWeb/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tailwindcss from "file:///C:/Users/DELL/Desktop/CBT/CBTWeb/node_modules/@tailwindcss/vite/dist/index.mjs";
import { resolve } from "path";
import { copyFileSync } from "fs";
var __vite_injected_original_dirname = "C:\\Users\\DELL\\Desktop\\CBT\\CBTWeb";
var isIIS = process.env.IS_IIS === "true";
var vite_config_default = defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: "copy-web-config",
      generateBundle() {
        if (isIIS) {
          const webConfigPath = resolve(__vite_injected_original_dirname, "web.config");
          const distPath = resolve(__vite_injected_original_dirname, "dist/web.config");
          try {
            copyFileSync(webConfigPath, distPath);
            console.log("\u2705 web.config copied to dist folder");
          } catch (error) {
            console.error("\u274C Error copying web.config:", error);
          }
        }
      }
    }
  ],
  // 👇 IMPORTANT: use './' for IIS so assets load correctly
  base: isIIS ? "./" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name]-[hash].js",
        chunkFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]"
      },
      treeshake: false
    },
    emptyOutDir: true,
    minify: true,
    sourcemap: false
  },
  server: {
    hmr: { overlay: false },
    fs: { allow: ["."] }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxERUxMXFxcXERlc2t0b3BcXFxcQ0JUXFxcXENCVFdlYlwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcREVMTFxcXFxEZXNrdG9wXFxcXENCVFxcXFxDQlRXZWJcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0RFTEwvRGVza3RvcC9DQlQvQ0JUV2ViL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnO1xyXG5pbXBvcnQgdGFpbHdpbmRjc3MgZnJvbSAnQHRhaWx3aW5kY3NzL3ZpdGUnO1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7IGNvcHlGaWxlU3luYyB9IGZyb20gJ2ZzJztcclxuXHJcbmNvbnN0IGlzSUlTID0gcHJvY2Vzcy5lbnYuSVNfSUlTID09PSAndHJ1ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtcclxuICAgIHRhaWx3aW5kY3NzKCksXHJcbiAgICByZWFjdCgpLFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAnY29weS13ZWItY29uZmlnJyxcclxuICAgICAgZ2VuZXJhdGVCdW5kbGUoKSB7XHJcbiAgICAgICAgaWYgKGlzSUlTKSB7XHJcbiAgICAgICAgICBjb25zdCB3ZWJDb25maWdQYXRoID0gcmVzb2x2ZShfX2Rpcm5hbWUsICd3ZWIuY29uZmlnJyk7XHJcbiAgICAgICAgICBjb25zdCBkaXN0UGF0aCA9IHJlc29sdmUoX19kaXJuYW1lLCAnZGlzdC93ZWIuY29uZmlnJyk7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb3B5RmlsZVN5bmMod2ViQ29uZmlnUGF0aCwgZGlzdFBhdGgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnXHUyNzA1IHdlYi5jb25maWcgY29waWVkIHRvIGRpc3QgZm9sZGVyJyk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdcdTI3NEMgRXJyb3IgY29weWluZyB3ZWIuY29uZmlnOicsIGVycm9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIF0sXHJcbiAgLy8gXHVEODNEXHVEQzQ3IElNUE9SVEFOVDogdXNlICcuLycgZm9yIElJUyBzbyBhc3NldHMgbG9hZCBjb3JyZWN0bHlcclxuICBiYXNlOiBpc0lJUyA/ICcuLycgOiAnLycsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgYXNzZXRzRGlyOiAnYXNzZXRzJyxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXHJcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5bZXh0XScsXHJcbiAgICAgIH0sXHJcbiAgICAgIHRyZWVzaGFrZTogZmFsc2UsXHJcbiAgICB9LFxyXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXHJcbiAgICBtaW5pZnk6IHRydWUsXHJcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxyXG4gIH0sXHJcbiAgc2VydmVyOiB7XHJcbiAgICBobXI6IHsgb3ZlcmxheTogZmFsc2UgfSxcclxuICAgIGZzOiB7IGFsbG93OiBbJy4nXSB9LFxyXG4gIH0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThSLFNBQVMsb0JBQW9CO0FBQzNULE9BQU8sV0FBVztBQUNsQixPQUFPLGlCQUFpQjtBQUN4QixTQUFTLGVBQWU7QUFDeEIsU0FBUyxvQkFBb0I7QUFKN0IsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTSxRQUFRLFFBQVEsSUFBSSxXQUFXO0FBRXJDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLE1BQU07QUFBQSxJQUNOO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFDZixZQUFJLE9BQU87QUFDVCxnQkFBTSxnQkFBZ0IsUUFBUSxrQ0FBVyxZQUFZO0FBQ3JELGdCQUFNLFdBQVcsUUFBUSxrQ0FBVyxpQkFBaUI7QUFDckQsY0FBSTtBQUNGLHlCQUFhLGVBQWUsUUFBUTtBQUNwQyxvQkFBUSxJQUFJLHlDQUFvQztBQUFBLFVBQ2xELFNBQVMsT0FBTztBQUNkLG9CQUFRLE1BQU0sb0NBQStCLEtBQUs7QUFBQSxVQUNwRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBRUEsTUFBTSxRQUFRLE9BQU87QUFBQSxFQUNyQixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLE1BQ0EsV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxFQUNiO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixLQUFLLEVBQUUsU0FBUyxNQUFNO0FBQUEsSUFDdEIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUU7QUFBQSxFQUNyQjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
