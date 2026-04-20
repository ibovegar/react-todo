import { VStack } from '@navikt/ds-react'
import { useLoaderData } from 'react-router'

import { createTagApi, createTodoAction, createTodoApi } from '~/api'
import { PageHeader, TagFilter, TodoList } from '~/components'
import { useTagFilter } from '~/hooks/use-tag-filter'

export function action({ request }: { request: Request }) {
  return createTodoAction({ request })
}

export async function loader({ request }: { request: Request }) {
  const todoApi = createTodoApi({ request })
  const tagApi = createTagApi({ request })
  const [todos, tags] = await Promise.all([todoApi.getOpen(), tagApi.getAll()])
  return { todos, tags }
}

const Open = () => {
  const { todos, tags } = useLoaderData<typeof loader>()
  const { allTags, activeFilters, filteredTodos, toggleFilter } = useTagFilter(todos)
  return (
    <VStack gap="space-20">
      <PageHeader
        title="Open Todos"
        actions={<TagFilter tags={allTags} activeFilters={activeFilters} onToggle={toggleFilter} />}
      />
      <TodoList todos={filteredTodos} availableTags={tags} showCreate />
    </VStack>
  )
}

export default Open
