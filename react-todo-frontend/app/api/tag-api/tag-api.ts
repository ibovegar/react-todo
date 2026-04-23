import type { ApiClient } from '~/api'
import type { TodoTag } from '~/models/tag'

export function tagApi(client: ApiClient) {
  return {
    getAll: async () => {
      const { data } = await client.GET('/api/tags')
      return data as TodoTag[]
    },
    create: async (tag: Omit<TodoTag, 'id'>) => {
      const { data } = await client.POST('/api/tags', { body: tag })
      return data as TodoTag
    },
    delete: async (id: string) => {
      await client.DELETE('/api/tags/{id}', { params: { path: { id } } })
    },
  }
}
