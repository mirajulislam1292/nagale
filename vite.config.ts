// Keep browser assets static; backend integration belongs in src/api.
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [react()],
  build: { sourcemap: false },
});
