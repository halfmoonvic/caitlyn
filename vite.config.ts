import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  plugins: [vue(), eslintPlugin(), StylelintPlugin()],
  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: '/index.html',
        login: '/login/index.html',
      },
    },
  },
  server: {
    proxy: {
      '/proxy/api': {
        target: 'http://127.0.0.1:3001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/proxy\/api/, ''),
      },
    },
  },
});
