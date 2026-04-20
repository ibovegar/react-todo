import { useMemo, useState } from 'react'

import type { Todo } from '~/models'
import { filterTodosByTags, getUniqueTags } from '~/utils'

export function useTagFilter(todos: Todo[]) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const allTags = useMemo(() => getUniqueTags(todos), [todos])
  const filteredTodos = filterTodosByTags(todos, activeFilters)

  function toggleFilter(tagId: string) {
    setActiveFilters((prev) => (prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]))
  }

  return { allTags, activeFilters, filteredTodos, toggleFilter }
}
