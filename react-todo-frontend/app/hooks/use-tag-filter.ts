import { useMemo, useState } from "react";
import type { Todo } from "~/api";
import { filterTodosByTags, getUniqueTags } from "~/utils";

export function useTagFilter(todos: Todo[]) {
	const [activeFilters, setActiveFilters] = useState<string[]>([]);
	const allTags = useMemo(() => getUniqueTags(todos), [todos]);
	const filteredTodos = filterTodosByTags(todos, activeFilters);

	function toggleFilter(tagName: string) {
		setActiveFilters((prev) =>
			prev.includes(tagName)
				? prev.filter((t) => t !== tagName)
				: [...prev, tagName],
		);
	}

	return { allTags, activeFilters, filteredTodos, toggleFilter };
}
