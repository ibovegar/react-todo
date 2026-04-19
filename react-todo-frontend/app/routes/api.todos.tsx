import type { TodoTag } from "~/api";
import {
	addTagToTodo,
	createTodo,
	deleteTodo,
	markTodoDone,
	markTodoOpen,
	updateTodo,
} from "~/api";

export async function action({ request }: { request: Request }) {
	const formData = await request.formData();
	const intent = formData.get("intent") as string;
	const id = formData.get("id") as string;

	if (intent === "create") {
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		const tags = JSON.parse(formData.get("tags") as string) as TodoTag[];
		await createTodo({ title, description, tags });
		return { ok: true };
	}

	if (intent === "update") {
		const title = formData.get("title") as string;
		const description = formData.get("description") as string;
		await updateTodo(id, { title, description });
		return { ok: true };
	}

	if (intent === "addTag") {
		const tags = JSON.parse(formData.get("tags") as string) as TodoTag[];
		await addTagToTodo(id, tags);
		return { ok: true };
	}

	if (intent === "delete") {
		await deleteTodo(id);
		return { ok: true };
	}

	if (intent === "markDone") {
		await markTodoDone(id);
		return { ok: true };
	}

	if (intent === "markOpen") {
		await markTodoOpen(id);
		return { ok: true };
	}

	return { ok: false };
}
