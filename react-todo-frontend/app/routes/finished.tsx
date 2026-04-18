import { useLoaderData } from 'react-router'

import type { TodoTag } from '~/api'
import { addTagToTodo, getFinishedTodos, getTags, markTodoOpen } from '~/api'
import { TodoList } from '~/components'

export async function loader() {
  const [todos, tags] = await Promise.all([getFinishedTodos(), getTags()])
  return { todos, tags }
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const intent = formData.get('intent') as string
  const id = formData.get('id') as string

  if (intent === 'addTag') {
    const tags = JSON.parse(formData.get('tags') as string) as TodoTag[]
    await addTagToTodo(id, tags)
    return { ok: true }
  }

  await markTodoOpen(id)
  return { ok: true }
}

export default function Finished() {
  const { todos, tags } = useLoaderData<typeof loader>()
  return <TodoList title="Finished Todos" todos={todos} availableTags={tags} />
}
