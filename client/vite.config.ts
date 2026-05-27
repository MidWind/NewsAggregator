import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/news/',
  server: {
    port: 3080,
    allowedHosts: ['midfeng.com'],
    proxy: {
      '/api': {
        target: 'http://localhost:5200',
        changeOrigin: true
      }
    }
  }
});