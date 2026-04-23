import type { ApiClient } from '~/api'
import type { TodoTag } from '~/models/tag'
import type { Todo } from '~/models/todo'

export function todoApi(client: ApiClient) {
  return {
    getOpen: async () => {
      const { data } = await client.GET('/api/todos', { params: { query: { status: 'open' } } })
      return data as Todo[]
    },
    getFinished: async () => {
      const { data } = await client.GET('/api/todos', { params: { query: { status: 'done' } } })
      return data as Todo[]
    },
    create: async (todo: { title: string; description: string; tags?: TodoTag[] }) => {
      const { data } = await client.POST('/api/todos', { body: todo })
      return data as Todo
    },
    update: async (id: string, fields: { title?: string; description?: string }) => {
      const { data } = await client.PATCH('/api/todos/{id}', { params: { path: { id } }, body: fields })
      return data as Todo
    },
    delete: async (id: string) => {
      await client.DELETE('/api/todos/{id}', { params: { path: { id } } })
    },
    markDone: async (id: string) => {
      const { data } = await client.PATCH('/api/todos/{id}', { params: { path: { id } }, body: { done: true } })
      return data as Todo
    },
    markOpen: async (id: string) => {
      const { data } = await client.PATCH('/api/todos/{id}', { params: { path: { id } }, body: { done: false } })
      return data as Todo
    },
    addTags: async (id: string, tags: TodoTag[]) => {
      const { data } = await client.PATCH('/api/todos/{id}', { params: { path: { id } }, body: { tags } })
      return data as Todo
    },
  }
}
