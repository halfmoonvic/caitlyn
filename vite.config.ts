/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import StylelintPlugin from 'vite-plugin-stylelint';

// eslint-disable-next-line
const { path, resolve } = require('path');

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [vue(), eslintPlugin(), StylelintPlugin()],
  resolve: {
    alias: {
      '@': root,
    },
  },
  test: {
    environment: 'happy-dom', // 或 'jsdom', 'happy-dom'
  },
  build: {
    outDir,
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
