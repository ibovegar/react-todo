import { setupServer } from 'msw/node'
import { handlers } from './handlers'

declare global {
  var __mswServer: ReturnType<typeof setupServer> | undefined
}

if (!globalThis.__mswServer) {
  globalThis.__mswServer = setupServer(...handlers)
  globalThis.__mswServer.listen({ onUnhandledRequest: 'bypass' })
  console.log('🔶 MSW server started')
}

export const server = globalThis.__mswServer

server.resetHandlers(...handlers)
