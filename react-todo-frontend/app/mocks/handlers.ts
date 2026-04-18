import { HttpResponse, http } from 'msw'
import { tags, todos } from './data'

import type { Todo, TodoTag } from '~/api'

export const handlers = [
  http.get('http://localhost:3001/api/todos', ({ request }) => {
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

  http.post('http://localhost:3001/api/todos', async ({ request }) => {
    const body = (await request.clone().json()) as { title: string; description: string; tags?: TodoTag[] }
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

  http.patch('http://localhost:3001/api/todos/:id', async ({ params, request }) => {
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
        if (seen.has(t.name)) return false
        seen.add(t.name)
        return true
      })
    }
    return HttpResponse.json(todo)
  }),

  http.get('http://localhost:3001/api/tags', () => {
    return HttpResponse.json(tags)
  }),

  http.post('http://localhost:3001/api/tags', async ({ request }) => {
    const body = (await request.clone().json()) as TodoTag
    if (tags.some((t) => t.name === body.name)) {
      return HttpResponse.json({ error: 'Tag already exists' }, { status: 409 })
    }
    tags.push(body)
    return HttpResponse.json(body, { status: 201 })
  }),

  http.delete('http://localhost:3001/api/tags/:name', ({ params }) => {
    const name = params.name as string
    const index = tags.findIndex((t) => t.name === name)
    if (index === -1) {
      return HttpResponse.json({ error: 'Tag not found' }, { status: 404 })
    }
    tags.splice(index, 1)
    for (const todo of todos) {
      todo.tags = todo.tags.filter((t) => t.name !== name)
    }
    return HttpResponse.json(null, { status: 204 })
  }),
]
