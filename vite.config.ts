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
  build: {
    outDir,
    rollupOptions: {
      input: {
        login: resolve(root, 'login/index.html'),
      },
    },
  },
});
