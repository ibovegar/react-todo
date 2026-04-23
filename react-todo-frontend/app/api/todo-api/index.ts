import { todoApi } from './todo-api'

import { createApiClient } from '~/api'
import type { TodoTag } from '~/models/tag'

export function createTodoApi({ request }: { request: Request }) {
  const baseUrl = process.env.API_BASE_URL ?? ''
  return todoApi(createApiClient(baseUrl, request))
}

export async function createTodoAction({ request }: { request: Request }) {
  const api = createTodoApi({ request })
  const formData = await request.formData()
  const intent = formData.get('intent') as string
  const id = formData.get('id') as string

  switch (intent) {
    case 'create': {
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const tags = JSON.parse(formData.get('tags') as string) as TodoTag[]
      await api.create({ title, description, tags })
      return { ok: true }
    }
    case 'update': {
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      await api.update(id, { title, description })
      return { ok: true }
    }
    case 'addTag': {
      const tags = JSON.parse(formData.get('tags') as string) as TodoTag[]
      await api.addTags(id, tags)
      return { ok: true }
    }
    case 'delete':
      await api.delete(id)
      return { ok: true }
    case 'markDone':
      await api.markDone(id)
      return { ok: true }
    case 'markOpen':
      await api.markOpen(id)
      return { ok: true }
    default:
      return { ok: false }
  }
}
