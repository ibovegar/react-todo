import { HttpResponse, http } from 'msw'
import { tags, todos } from './data'

import type { Todo, TodoTag } from '~/models'

export const handlers = [
  http.get('*/api/todos', ({ request }) => {
    const url = new URL(request.url)
    const status = url.searchParams.get('status')

    const sorted = [...todos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    if (status === 'open') {
      return HttpResponse.json(sorted.filter((t) => !t.done))
    }
    if (status === 'done') {
      return HttpResponse.json(sorted.filter((t) => t.done))
    }

    return HttpResponse.json(sorted)
  }),

  http.post('*/api/todos', async ({ request }) => {
    const body = (await request.clone().json()) as {
      title: string
      description: string
      tags?: TodoTag[]
    }
    const maxId = todos.reduce((max, t) => Math.max(max, Number(t.id)), 0)
    const newTodo: Todo = {
      id: String(maxId + 1),
      title: body.title,
      description: body.description,
      done: false,
      tags: body.tags ?? [],
      createdAt: new Date().toISOString(),
    }
    todos.push(newTodo)
    return HttpResponse.json(newTodo, { status: 201 })
  }),

  http.patch('*/api/todos/:id', async ({ params, request }) => {
    const id = params.id as string
    const body = (await request.clone().json()) as Partial<Todo>
    const todo = todos.find((t) => t.id === id)
    if (!todo) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    Object.assign(todo, body)
    if (todo.tags) {
      const seen = new Set<string>()
      todo.tags = todo.tags.filter((t) => {
        if (seen.has(t.id)) return false
        seen.add(t.id)
        return true
      })
    }
    return HttpResponse.json(todo)
  }),

  http.get('*/api/tags', () => {
    return HttpResponse.json(tags)
  }),

  http.post('*/api/tags', async ({ request }) => {
    const body = (await request.clone().json()) as Omit<TodoTag, 'id'>
    if (tags.some((t) => t.name === body.name)) {
      return HttpResponse.json({ error: 'Tag already exists' }, { status: 409 })
    }
    const maxId = tags.reduce((max, t) => Math.max(max, Number(t.id.replace('tag-', ''))), 0)
    const newTag: TodoTag = { id: `tag-${maxId + 1}`, ...body }
    tags.push(newTag)
    return HttpResponse.json(newTag, { status: 201 })
  }),

  http.delete('*/api/todos/:id', ({ params }) => {
    const id = params.id as string
    const index = todos.findIndex((t) => t.id === id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Not found' }, { status: 404 })
    }
    todos.splice(index, 1)
    return HttpResponse.json(null, { status: 204 })
  }),

  http.delete('*/api/tags/:id', ({ params }) => {
    const id = params.id as string
    const index = tags.findIndex((t) => t.id === id)
    if (index === -1) {
      return HttpResponse.json({ error: 'Tag not found' }, { status: 404 })
    }
    tags.splice(index, 1)
    for (const todo of todos) {
      todo.tags = todo.tags.filter((t) => t.id !== id)
    }
    return HttpResponse.json(null, { status: 204 })
  }),
]
