import { PlusIcon } from "@navikt/aksel-icons";
import {
	Box,
	Button,
	Heading,
	HStack,
	Textarea,
	TextField,
	VStack,
} from "@navikt/ds-react";
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router";
import type { TodoTag } from "~/api";
import { useCardExpandAnimation } from "~/hooks/use-card-expand-animation";
import { ExpandModal } from "../../shared/ExpandModal";
import { TagCloud } from "../../tag/TagCloud";
import styles from "./CreateTodoCard.module.css";

interface CreateTodoCardProps {
	availableTags: TodoTag[];
}

export const CreateTodoCard = (props: CreateTodoCardProps) => {
	const { availableTags } = props;
	const fetcher = useFetcher();
	const [selectedTags, setSelectedTags] = useState<TodoTag[]>([]);
	const isSubmitting = fetcher.state !== "idle";
	const submittedRef = useRef(false);

	const animation = useCardExpandAnimation(() => {
		setSelectedTags([]);
	});

	useEffect(() => {
		if (fetcher.state === "idle" && submittedRef.current) {
			submittedRef.current = false;
			animation.close();
		}
	}, [fetcher.state, animation.close]);

	if (!animation.isOpen) {
		return (
			<Box
				ref={animation.triggerRef as React.RefObject<HTMLButtonElement>}
				as="button"
				className={styles.card}
				onClick={() => animation.open()}
				padding="space-12"
				borderRadius="8"
				borderWidth="1"
				borderColor="neutral-subtle"
				background="default"
				style={{ cursor: "pointer", height: "100%", minHeight: "180px" }}
			>
				<VStack
					gap="space-4"
					align="center"
					justify="center"
					style={{ height: "100%" }}
				>
					<PlusIcon
						fontSize="2rem"
						style={{ color: "var(--ax-text-neutral-subtle)" }}
					/>
					<Heading
						size="small"
						style={{ color: "var(--ax-text-neutral-subtle)" }}
					>
						New todo
					</Heading>
				</VStack>
			</Box>
		);
	}

	return (
		<ExpandModal
			isClosing={animation.isClosing}
			animationStyle={animation.animationStyle}
			modalRef={animation.modalRef}
			onAnimationEnd={animation.onAnimationEnd}
			onClose={animation.close}
		>
			<fetcher.Form
				method="post"
				action="/api/todos"
				onSubmit={() => {
					submittedRef.current = true;
				}}
			>
				<input type="hidden" name="intent" value="create" />
				<input type="hidden" name="tags" value={JSON.stringify(selectedTags)} />
				<VStack gap="space-16">
					<TextField label="Title" name="title" size="small" autoFocus />
					<Textarea
						label="Description"
						name="description"
						size="small"
						minRows={8}
					/>
					{availableTags.length > 0 && (
						<VStack gap="space-4">
							<Heading size="xsmall">Tags</Heading>
							<TagCloud
								tags={availableTags}
								disabledTags={availableTags.filter(
									(t) => !selectedTags.some((s) => s.name === t.name),
								)}
								onSelect={(tag) => {
									const isSelected = selectedTags.some(
										(s) => s.name === tag.name,
									);
									setSelectedTags((prev) =>
										isSelected
											? prev.filter((t) => t.name !== tag.name)
											: [...prev, tag],
									);
								}}
							/>
						</VStack>
					)}
					<HStack gap="space-4" justify="end">
						<Button
							type="button"
							variant="tertiary"
							size="small"
							onClick={animation.close}
						>
							Cancel
						</Button>
						<Button
							type="submit"
							variant="primary"
							size="small"
							loading={isSubmitting}
						>
							Create
						</Button>
					</HStack>
				</VStack>
			</fetcher.Form>
		</ExpandModal>
	);
};
