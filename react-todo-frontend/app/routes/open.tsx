import { VStack } from "@navikt/ds-react";
import { useLoaderData } from "react-router";
import { getOpenTodos, getTags } from "~/api";
import { PageHeader, TagFilter, TodoList } from "~/components";
import { useTagFilter } from "~/hooks/use-tag-filter";

export async function loader() {
	const [todos, tags] = await Promise.all([getOpenTodos(), getTags()]);
	return { todos, tags };
}

const Open = () => {
	const { todos, tags } = useLoaderData<typeof loader>();
	const { allTags, activeFilters, filteredTodos, toggleFilter } =
		useTagFilter(todos);
	return (
		<VStack gap="space-20">
			<PageHeader
				title="Open Todos"
				actions={
					<TagFilter
						tags={allTags}
						activeFilters={activeFilters}
						onToggle={toggleFilter}
					/>
				}
			/>
			<TodoList todos={filteredTodos} availableTags={tags} showCreate />
		</VStack>
	);
};

export default Open;
