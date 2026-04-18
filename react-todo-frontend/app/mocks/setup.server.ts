import { server } from './node'

server.listen({ onUnhandledRequest: 'bypass' })
console.log('🔶 MSW server started')
