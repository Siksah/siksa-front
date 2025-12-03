import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isProduction = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser',  // 코드 압축 시 terser 사용
    terserOptions: {
      compress: {
        drop_console: isProduction,   // production에서만 console 제거
        // drop_debugger: isProduction,  // production에서 debugger 제거
      },
      format: {
        comments: false, // 주석 제거
      },
    },
  },
});
