import { TrashIcon } from "@navikt/aksel-icons";
import { BodyShort, Button, Heading, HStack, VStack } from "@navikt/ds-react";
import { useEffect } from "react";
import { useFetcher } from "react-router";
import type { Todo, TodoTag } from "~/api";
import { useCardExpandAnimation } from "~/hooks/use-card-expand-animation";
import { ExpandModal } from "../../shared/ExpandModal";
import { TodoTagEditor } from "../TodoTagEditor";

interface TodoDetailDialogProps {
	todo: Todo;
	availableTags: TodoTag[];
	originElement: HTMLElement | null;
	onClose: () => void;
}

export const TodoDetailDialog = (props: TodoDetailDialogProps) => {
	const { todo, availableTags, originElement, onClose } = props;
	const fetcher = useFetcher();
	const deleteFetcher = useFetcher();
	const tagFetcher = useFetcher();
	const isSubmitting = fetcher.state !== "idle";
	const isDeleting = deleteFetcher.state !== "idle";
	const animation = useCardExpandAnimation(onClose);

	useEffect(() => {
		animation.open(originElement);
	}, [animation.open, originElement]);

	useEffect(() => {
		if (fetcher.state === "idle" && fetcher.data) {
			animation.close();
		}
	}, [fetcher.state, fetcher.data, animation.close]);

	useEffect(() => {
		if (deleteFetcher.state === "idle" && deleteFetcher.data) {
			animation.close();
		}
	}, [deleteFetcher.state, deleteFetcher.data, animation.close]);

	function handleAddTag(tag: TodoTag) {
		if (todo.tags.some((t) => t.name === tag.name)) return;
		const newTags = [...todo.tags, tag];
		tagFetcher.submit(
			{ intent: "addTag", id: todo.id, tags: JSON.stringify(newTags) },
			{ method: "post", action: "/api/todos" },
		);
	}

	function handleRemoveTag(tagName: string) {
		const newTags = todo.tags.filter((t) => t.name !== tagName);
		tagFetcher.submit(
			{ intent: "addTag", id: todo.id, tags: JSON.stringify(newTags) },
			{ method: "post", action: "/api/todos" },
		);
	}

	if (!animation.isOpen) return null;

	return (
		<ExpandModal
			isClosing={animation.isClosing}
			animationStyle={animation.animationStyle}
			modalRef={animation.modalRef}
			onAnimationEnd={animation.onAnimationEnd}
			onClose={animation.close}
		>
			<VStack gap="space-12">
				<Heading size="medium">{todo.title}</Heading>
				<TodoTagEditor
					tags={todo.tags}
					availableTags={availableTags}
					onAdd={handleAddTag}
					onRemove={handleRemoveTag}
				/>
				<BodyShort>{todo.description}</BodyShort>
				<HStack gap="space-4" justify="end">
					<Button
						variant="danger"
						size="small"
						icon={<TrashIcon aria-hidden />}
						loading={isDeleting}
						onClick={() =>
							deleteFetcher.submit(
								{ intent: "delete", id: todo.id },
								{ method: "post", action: "/api/todos" },
							)
						}
					>
						Delete
					</Button>
					<Button variant="secondary" size="small" onClick={animation.close}>
						Close
					</Button>
					<Button
						variant="primary"
						size="small"
						loading={isSubmitting}
						onClick={() =>
							fetcher.submit(
								{ intent: todo.done ? "markOpen" : "markDone", id: todo.id },
								{ method: "post", action: "/api/todos" },
							)
						}
					>
						{todo.done ? "Reopen" : "Mark as finished"}
					</Button>
				</HStack>
			</VStack>
		</ExpandModal>
	);
};
