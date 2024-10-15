import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Use a port Railway can handle
    proxy: {
      // Proxy API requests to the backend if needed
      '/api': {
        target: 'https://gradpad-backend-production.up.railway.app/', // Update this to your backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',  // Ensure that this matches where your build assets should go
    sourcemap: true,  // Optional: Enable source maps for debugging
  },
  resolve: {
    alias: {
      '@': '/src',  // Optional: Custom path aliasing if needed
    },
  },
  define: {
    'process.env': {},  // Ensure process.env works if needed for environment variables
  },
});
