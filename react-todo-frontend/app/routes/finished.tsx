import { VStack } from "@navikt/ds-react";
import { useLoaderData } from "react-router";
import { getFinishedTodos, getTags } from "~/api";
import { PageHeader, TagFilter, TodoList } from "~/components";
import { useTagFilter } from "~/hooks/use-tag-filter";

export async function loader() {
	const [todos, tags] = await Promise.all([getFinishedTodos(), getTags()]);
	return { todos, tags };
}

const Finished = () => {
	const { todos, tags } = useLoaderData<typeof loader>();
	const { allTags, activeFilters, filteredTodos, toggleFilter } =
		useTagFilter(todos);
	return (
		<VStack gap="space-20">
			<PageHeader
				title="Finished Todos"
				actions={
					<TagFilter
						tags={allTags}
						activeFilters={activeFilters}
						onToggle={toggleFilter}
					/>
				}
			/>
			<TodoList todos={filteredTodos} availableTags={tags} />
		</VStack>
	);
};

export default Finished;
