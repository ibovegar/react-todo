import createClient, { type Middleware } from 'openapi-fetch'

import type { paths } from '~/api/generated/schema'

const throwOnError: Middleware = {
  async onResponse({ response }) {
    if (!response.ok) {
      throw new Response(response.statusText, { status: response.status })
    }
    return undefined
  },
}

export function createApiClient(baseUrl: string, request: Request) {
  const token = request.headers.get('Authorization')

  const authMiddleware: Middleware = {
    async onRequest({ request }) {
      if (token) {
        request.headers.set('Authorization', token)
      }
      return request
    },
  }

  const client = createClient<paths>({ baseUrl })
  client.use(authMiddleware)
  client.use(throwOnError)
  return client
}

export type ApiClient = ReturnType<typeof createApiClient>
