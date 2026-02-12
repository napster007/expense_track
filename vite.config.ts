import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/v1': {
          target: env.VITE_API_URL || 'http://localhost:8083',
          changeOrigin: true,
        },
      },
    },
  }
})
