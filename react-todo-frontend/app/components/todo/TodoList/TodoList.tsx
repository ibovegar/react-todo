import { BodyLong, Heading, HGrid, HStack, LinkCard, Tag, VStack } from '@navikt/ds-react'
import { useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { PageHeader } from '../../shared/PageHeader'
import { TagFilter } from '../../tag/TagFilter'
import { CreateTodoCard } from '../CreateTodoCard'
import { TodoDetailDialog } from '../TodoDetailDialog'
import styles from './TodoList.module.css'

import type { Todo, TodoTag } from '~/api'
import { filterTodosByTags, getUniqueTags } from '~/utils'

interface TodoListProps {
  title: string
  todos: Todo[]
  availableTags: TodoTag[]
  showCreate?: boolean
}

export function TodoList(props: TodoListProps) {
  const { title, todos, availableTags, showCreate } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const originElementRef = useRef<HTMLElement | null>(null)
  const selectedId = searchParams.get('todo')
  const selectedTodo = todos.find((t) => t.id === selectedId)

  const allTags = useMemo(() => getUniqueTags(todos), [todos])
  const filteredTodos = filterTodosByTags(todos, activeFilters)

  function toggleFilter(tagName: string) {
    setActiveFilters((prev) => (prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [...prev, tagName]))
  }

  function handleCardClick(e: React.MouseEvent, todoId: string) {
    e.preventDefault()
    originElementRef.current = e.currentTarget as HTMLElement
    setSearchParams({ todo: todoId })
  }

  return (
    <VStack gap="space-20">
      <PageHeader
        title={title}
        actions={<TagFilter tags={allTags} activeFilters={activeFilters} onToggle={toggleFilter} />}
      />
      <HGrid gap="space-4" columns={{ xs: 1, sm: 2, lg: 3 }} align="start">
        {showCreate && <CreateTodoCard availableTags={availableTags} />}
        {filteredTodos.map((todo) => (
          <LinkCard key={todo.id} className={styles.card} onClick={(e) => handleCardClick(e, todo.id)}>
            <VStack gap="space-12">
              <LinkCard.Anchor href={`?todo=${todo.id}`}>
                <Heading size="small">{todo.title}</Heading>
              </LinkCard.Anchor>
              <HStack gap="space-2" wrap>
                {todo.tags.map((tag) => (
                  <Tag key={tag.name} variant="moderate" size="small" data-color={tag.color}>
                    {tag.name}
                  </Tag>
                ))}
              </HStack>
              <BodyLong
                style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
              >
                {todo.description}
              </BodyLong>
            </VStack>
          </LinkCard>
        ))}
      </HGrid>
      {selectedTodo && (
        <TodoDetailDialog
          todo={selectedTodo}
          availableTags={availableTags}
          originElement={originElementRef.current}
          onClose={() => setSearchParams({})}
        />
      )}
    </VStack>
  )
}
