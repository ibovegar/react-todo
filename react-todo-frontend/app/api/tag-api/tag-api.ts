import type { Fetcher } from '../api-client'

import type { TodoTag } from '~/models/tag'

export function tagApi(fetch: Fetcher) {
  return {
    getAll: () => fetch<TodoTag[]>('/tags'),
    create: (tag: Omit<TodoTag, 'id'>) => fetch<TodoTag>('/tags', { method: 'POST', body: JSON.stringify(tag) }),
    delete: (id: string) => fetch<void>(`/tags/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  }
}
