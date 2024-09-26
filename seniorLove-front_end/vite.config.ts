import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const port = Number(env.VITE_PORT || '3000');

  return {
    server: {
      host: '0.0.0.0', // Bind to all network interfaces
      port: port, // Use the port from .env or default to 3000
    },
    plugins: [react()],
  };
});