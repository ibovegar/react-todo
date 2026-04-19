export type { TagColor, TodoTag } from "~/models/tag";
export type { Todo } from "~/models/todo";

import type { TodoTag } from "~/models/tag";
import type { Todo } from "~/models/todo";

const API_BASE = "http://localhost:3001/api";

export async function getOpenTodos(): Promise<Todo[]> {
	const res = await fetch(`${API_BASE}/todos?status=open`);
	return res.json();
}

export async function getFinishedTodos(): Promise<Todo[]> {
	const res = await fetch(`${API_BASE}/todos?status=done`);
	return res.json();
}

export async function markTodoDone(id: string): Promise<Todo> {
	const res = await fetch(`${API_BASE}/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ done: true }),
	});
	return res.json();
}

export async function markTodoOpen(id: string): Promise<Todo> {
	const res = await fetch(`${API_BASE}/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ done: false }),
	});
	return res.json();
}

export async function addTagToTodo(id: string, tags: TodoTag[]): Promise<Todo> {
	const res = await fetch(`${API_BASE}/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ tags }),
	});
	return res.json();
}

export async function createTodo(todo: {
	title: string;
	description: string;
	tags?: TodoTag[];
}): Promise<Todo> {
	const res = await fetch(`${API_BASE}/todos`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(todo),
	});
	return res.json();
}

export async function getTags(): Promise<TodoTag[]> {
	const res = await fetch(`${API_BASE}/tags`);
	return res.json();
}

export async function createTag(tag: TodoTag): Promise<TodoTag> {
	const res = await fetch(`${API_BASE}/tags`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(tag),
	});
	return res.json();
}

export async function deleteTodo(id: string): Promise<void> {
	await fetch(`${API_BASE}/todos/${id}`, { method: "DELETE" });
}

export async function updateTodo(
	id: string,
	fields: { title?: string; description?: string },
): Promise<Todo> {
	const res = await fetch(`${API_BASE}/todos/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(fields),
	});
	return res.json();
}

export async function deleteTag(name: string): Promise<void> {
	await fetch(`${API_BASE}/tags/${encodeURIComponent(name)}`, {
		method: "DELETE",
	});
}
