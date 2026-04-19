import { HStack, Textarea, TextField, VStack } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import type { Todo, TodoTag } from "~/api";
import { useAutoSave } from "~/hooks/use-auto-save";
import { useCardExpandAnimation } from "~/hooks/use-card-expand-animation";
import { useTodoActions } from "~/hooks/use-todo-actions";
import { getUnusedTags } from "~/utils";
import { ExpandModal } from "../../shared/ExpandModal";
import { RemovableTag } from "../../tag/RemovableTag";
import { TagCloud } from "../../tag/TagCloud";
import { TodoDetailFooter } from "../TodoDetailFooter";
import styles from "./TodoDetailDialog.module.css";

interface TodoDetailDialogProps {
	todo?: Todo;
	availableTags: TodoTag[];
	originElement: HTMLElement | null;
	onClose: () => void;
}

export const TodoDetailDialog = (props: TodoDetailDialogProps) => {
	const { todo, availableTags, originElement, onClose } = props;
	const isCreateMode = !todo;
	const actions = useTodoActions(todo);
	const animation = useCardExpandAnimation(onClose);
	const [title, setTitle] = useState(todo?.title ?? "");
	const [description, setDescription] = useState(todo?.description ?? "");
	const [localTags, setLocalTags] = useState<TodoTag[]>(todo?.tags ?? []);
	const [showTagEditor, setShowTagEditor] = useState(false);
	const tags = todo?.tags ?? localTags;
	const unusedTags = getUnusedTags(availableTags, tags);

	useAutoSave(
		(t, d) => {
			if (t !== todo?.title || d !== todo?.description) actions.update(t, d);
		},
		title,
		description,
		!isCreateMode,
	);

	useEffect(() => {
		animation.open(originElement);
	}, [animation.open, originElement]);

	useEffect(() => {
		if (actions.fetcherState === "idle" && actions.fetcherData) {
			animation.close();
		}
	}, [actions.fetcherState, actions.fetcherData, animation.close]);

	useEffect(() => {
		if (actions.deleteFetcherState === "idle" && actions.deleteFetcherData) {
			animation.close();
		}
	}, [actions.deleteFetcherState, actions.deleteFetcherData, animation.close]);

	useEffect(() => {
		if (
			isCreateMode &&
			actions.fetcherState === "idle" &&
			actions.createSubmittedRef.current
		) {
			actions.createSubmittedRef.current = false;
			animation.close();
		}
	}, [
		actions.fetcherState,
		animation.close,
		isCreateMode,
		actions.createSubmittedRef,
	]);

	function handleAddTag(tag: TodoTag) {
		if (tags.some((t) => t.name === tag.name)) return;
		const newTags = [...tags, tag];
		if (todo) {
			actions.setTags(newTags);
		} else {
			setLocalTags(newTags);
		}
	}

	function handleRemoveTag(tagName: string) {
		const newTags = tags.filter((t) => t.name !== tagName);
		if (todo) {
			actions.setTags(newTags);
		} else {
			setLocalTags(newTags);
		}
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
				<TextField
					label="Title"
					size="small"
					hideLabel
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className={`${styles.borderlessInput} ${styles.title}`}
					placeholder="Title"
					autoFocus={isCreateMode}
				/>
				<Textarea
					label="Description"
					size="small"
					hideLabel
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					minRows={4}
					className={styles.borderlessInput}
					placeholder="Add a description..."
				/>
				{tags.length > 0 && (
					<HStack gap="space-2" wrap>
						{tags.map((tag) => (
							<RemovableTag
								key={tag.name}
								tag={tag}
								onRemove={handleRemoveTag}
							/>
						))}
					</HStack>
				)}
				{showTagEditor && unusedTags.length > 0 && (
					<TagCloud
						tags={unusedTags}
						disabledTags={unusedTags}
						onSelect={handleAddTag}
					/>
				)}
				<TodoDetailFooter
					todo={todo}
					isSubmitting={actions.isSubmitting}
					isDeleting={actions.isDeleting}
					onDelete={actions.remove}
					onToggleDone={actions.toggleDone}
					onToggleTags={() => setShowTagEditor((v) => !v)}
					onCreate={() => actions.create(title, description, localTags)}
					onClose={animation.close}
				/>
			</VStack>
		</ExpandModal>
	);
};
