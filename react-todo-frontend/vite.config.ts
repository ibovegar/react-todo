import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    {
      name: 'msw-server',
      async configureServer() {
        await import('./app/mocks/setup.server')
      },
    },
    reactRouter(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
