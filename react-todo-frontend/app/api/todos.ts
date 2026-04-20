import type { TodoTag } from "~/models/tag";
import type { Todo } from "~/models/todo";

const BASE = process.env.API_BASE_URL ?? "";

function apiFetch(path: string, init?: RequestInit) {
	return fetch(`${BASE}/api${path}`, init);
}

export async function getOpenTodos(): Promise<Todo[]> {
	const res = await apiFetch("/todos?status=open");
	return res.json();
}

export async function getFinishedTodos(): Promise<Todo[]> {
	const res = await apiFetch("/todos?status=done");
	return res.json();
}

export async function getTags(): Promise<TodoTag[]> {
	const res = await apiFetch("/tags");
	return res.json();
}

export async function createTodo(todo: {
	title: string;
	description: string;
	tags?: TodoTag[];
}): Promise<Todo> {
	const res = await apiFetch("/todos", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(todo),
	});
	return res.json();
}

export async function updateTodo(
	id: string,
	fields: { title?: string; description?: string },
): Promise<Todo> {
	const res = await apiFetch(`/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(fields),
	});
	return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
	await apiFetch(`/todos/${id}`, { method: "DELETE" });
}

export async function markTodoDone(id: string): Promise<Todo> {
	const res = await apiFetch(`/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ done: true }),
	});
	return res.json();
}

export async function markTodoOpen(id: string): Promise<Todo> {
	const res = await apiFetch(`/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ done: false }),
	});
	return res.json();
}

export async function addTagToTodo(id: string, tags: TodoTag[]): Promise<Todo> {
	const res = await apiFetch(`/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ tags }),
	});
	return res.json();
}

export async function createTag(tag: Omit<TodoTag, "id">): Promise<TodoTag> {
	const res = await apiFetch("/tags", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(tag),
	});
	return res.json();
}

export async function deleteTag(id: string): Promise<void> {
	await apiFetch(`/tags/${encodeURIComponent(id)}`, { method: "DELETE" });
}
