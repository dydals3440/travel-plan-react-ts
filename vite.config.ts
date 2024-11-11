import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // root가 변경됨
  root: 'client',
  server: {
    // proxy 설정 추가
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
