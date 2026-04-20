import type { Fetcher } from '../api-client'

import type { TodoTag } from '~/models/tag'
import type { Todo } from '~/models/todo'

export function todoApi(fetch: Fetcher) {
  return {
    getOpen: () => fetch<Todo[]>('/todos?status=open'),
    getFinished: () => fetch<Todo[]>('/todos?status=done'),
    create: (todo: { title: string; description: string; tags?: TodoTag[] }) =>
      fetch<Todo>('/todos', { method: 'POST', body: JSON.stringify(todo) }),
    update: (id: string, fields: { title?: string; description?: string }) =>
      fetch<Todo>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify(fields) }),
    delete: (id: string) => fetch<void>(`/todos/${id}`, { method: 'DELETE' }),
    markDone: (id: string) => fetch<Todo>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify({ done: true }) }),
    markOpen: (id: string) => fetch<Todo>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify({ done: false }) }),
    addTags: (id: string, tags: TodoTag[]) =>
      fetch<Todo>(`/todos/${id}`, { method: 'PATCH', body: JSON.stringify({ tags }) }),
  }
}
