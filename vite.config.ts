import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // root가 변경됨
  root: 'client',
  server: {
    // proxy 설정 추가
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  // alias 추가
  resolve: {
    alias: {
      '@': '/src',
      '@icons': '/src/assets/icons',
    },
  },
});
