import { VStack } from '@navikt/ds-react'
import { useLoaderData } from 'react-router'

import {
  addTagToTodo,
  createTodo,
  deleteTodo,
  getFinishedTodos,
  getTags,
  markTodoDone,
  markTodoOpen,
  updateTodo,
} from '~/api'
import { PageHeader, TagFilter, TodoList } from '~/components'
import { useTagFilter } from '~/hooks/use-tag-filter'
import type { TodoTag } from '~/models'

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const intent = formData.get('intent') as string
  const id = formData.get('id') as string

  switch (intent) {
    case 'create': {
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      const tags = JSON.parse(formData.get('tags') as string) as TodoTag[]
      await createTodo({ title, description, tags })
      return { ok: true }
    }
    case 'update': {
      const title = formData.get('title') as string
      const description = formData.get('description') as string
      await updateTodo(id, { title, description })
      return { ok: true }
    }
    case 'addTag': {
      const tags = JSON.parse(formData.get('tags') as string) as TodoTag[]
      await addTagToTodo(id, tags)
      return { ok: true }
    }
    case 'delete':
      await deleteTodo(id)
      return { ok: true }
    case 'markDone':
      await markTodoDone(id)
      return { ok: true }
    case 'markOpen':
      await markTodoOpen(id)
      return { ok: true }
    default:
      return { ok: false }
  }
}

export async function loader() {
  const [todos, tags] = await Promise.all([getFinishedTodos(), getTags()])
  return { todos, tags }
}

const Finished = () => {
  const { todos, tags } = useLoaderData<typeof loader>()
  const { allTags, activeFilters, filteredTodos, toggleFilter } = useTagFilter(todos)
  return (
    <VStack gap="space-20">
      <PageHeader
        title="Finished Todos"
        actions={<TagFilter tags={allTags} activeFilters={activeFilters} onToggle={toggleFilter} />}
      />
      <TodoList todos={filteredTodos} availableTags={tags} />
    </VStack>
  )
}

export default Finished
