import { useLoaderData } from 'react-router'

import type { TodoTag } from '~/api'
import { addTagToTodo, createTodo, getOpenTodos, getTags, markTodoDone } from '~/api'
import { TodoList } from '~/components'

export async function loader() {
  const [todos, tags] = await Promise.all([getOpenTodos(), getTags()])
  return { todos, tags }
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const intent = formData.get('intent') as string
  const id = formData.get('id') as string

  if (intent === 'create') {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const tags = JSON.parse(formData.get('tags') as string) as TodoTag[]
    await createTodo({ title, description, tags })
    return { ok: true }
  }

  if (intent === 'addTag') {
    const tags = JSON.parse(formData.get('tags') as string) as TodoTag[]
    await addTagToTodo(id, tags)
    return { ok: true }
  }

  await markTodoDone(id)
  return { ok: true }
}

export default function Open() {
  const { todos, tags } = useLoaderData<typeof loader>()
  return <TodoList title="Open Todos" todos={todos} availableTags={tags} showCreate />
}
