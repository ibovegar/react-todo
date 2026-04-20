import { reactRouter } from '@react-router/dev/vite'
import type { Plugin } from 'vite'
import { defineConfig, loadEnv } from 'vite'

function mswPlugin(): Plugin {
  return {
    name: 'msw-server',
    async configureServer(server) {
      await server.ssrLoadModule('./app/mocks/node.ts')
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [...(env.VITE_USE_MSW === 'true' ? [mswPlugin()] : []), reactRouter()],
    resolve: {
      tsconfigPaths: true,
    },
  }
})
