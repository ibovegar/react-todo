import { useRef } from "react";
import { useFetcher } from "react-router";
import type { Todo, TodoTag } from "~/models";

const ACTION = "/actions/todos";

export function useTodoActions(todo?: Todo) {
	const fetcher = useFetcher();
	const deleteFetcher = useFetcher();
	const tagFetcher = useFetcher();
	const updateFetcher = useFetcher();
	const createSubmittedRef = useRef(false);

	function create(title: string, description: string, tags: TodoTag[]) {
		createSubmittedRef.current = true;
		fetcher.submit(
			{ intent: "create", title, description, tags: JSON.stringify(tags) },
			{ method: "post", action: ACTION },
		);
	}

	function update(title: string, description: string) {
		if (!todo) return;
		updateFetcher.submit(
			{ intent: "update", id: todo.id, title, description },
			{ method: "post", action: ACTION },
		);
	}

	function remove() {
		if (!todo) return;
		deleteFetcher.submit(
			{ intent: "delete", id: todo.id },
			{ method: "post", action: ACTION },
		);
	}

	function toggleDone() {
		if (!todo) return;
		fetcher.submit(
			{ intent: todo.done ? "markOpen" : "markDone", id: todo.id },
			{ method: "post", action: ACTION },
		);
	}

	function setTags(tags: TodoTag[]) {
		if (!todo) return;
		tagFetcher.submit(
			{ intent: "addTag", id: todo.id, tags: JSON.stringify(tags) },
			{ method: "post", action: ACTION },
		);
	}

	return {
		create,
		update,
		remove,
		toggleDone,
		setTags,
		isSubmitting: fetcher.state !== "idle",
		isDeleting: deleteFetcher.state !== "idle",
		fetcherState: fetcher.state,
		fetcherData: fetcher.data,
		deleteFetcherState: deleteFetcher.state,
		deleteFetcherData: deleteFetcher.data,
		createSubmittedRef,
	};
}
