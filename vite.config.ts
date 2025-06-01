import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/infrastructure/ui/components'),
      '@features': path.resolve(__dirname, './src/infrastructure/ui/features'),
      '@pages': path.resolve(__dirname, './src/infrastructure/ui/pages'),
      '@layouts': path.resolve(__dirname, './src/infrastructure/ui/layouts'),
      '@routes': path.resolve(__dirname, './src/infrastructure/ui/routes'),
      '@store': path.resolve(__dirname, './src/infrastructure/store'),
      '@api': path.resolve(__dirname, './src/infrastructure/api'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@lang': path.resolve(__dirname, './src/infrastructure/services/lang')
    }
  },
  // Configuración de servidor con HTTPS
  server: {
    host: '0.0.0.0',
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost+2.pem')),
    },
    port: 5174, // Cambiado de 5173 a 5174
    proxy: {
      '/api/v1': {
        target: 'http://backend:8080',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'),
        cookieDomainRewrite: {
          '*': ''
        },
        headers: {
          'Access-Control-Allow-Origin': 'https://localhost:5174',
          'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
          'Access-Control-Allow-Credentials': 'true',
        },
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Proxy request:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Proxy response:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
});