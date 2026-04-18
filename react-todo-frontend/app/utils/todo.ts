import type { Todo, TodoTag } from '~/models'

export function getUniqueTags(todos: Todo[]): TodoTag[] {
  const tagMap = new Map<string, TodoTag>()
  for (const tag of todos.flatMap((t) => t.tags)) {
    tagMap.set(tag.name, tag)
  }
  return [...tagMap.values()]
}

export function filterTodosByTags(todos: Todo[], activeFilters: string[]): Todo[] {
  if (activeFilters.length === 0) return todos
  return todos.filter((todo) => todo.tags.some((tag) => activeFilters.includes(tag.name)))
}

export function getUnusedTags(availableTags: TodoTag[], currentTags: TodoTag[]): TodoTag[] {
  return availableTags.filter((t) => !currentTags.some((ct) => ct.name === t.name))
}
