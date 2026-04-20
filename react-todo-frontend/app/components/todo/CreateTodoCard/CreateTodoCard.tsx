import { PlusIcon } from "@navikt/aksel-icons";
import { Box, Heading, VStack } from "@navikt/ds-react";
import { useRef, useState } from "react";
import type { TodoTag } from "~/models";
import { TodoDetailDialog } from "../TodoDetailDialog";
import styles from "./CreateTodoCard.module.css";

interface CreateTodoCardProps {
	availableTags: TodoTag[];
}

export const CreateTodoCard = (props: CreateTodoCardProps) => {
	const { availableTags } = props;
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<Box
				ref={triggerRef}
				as="button"
				className={styles.card}
				onClick={() => setIsOpen(true)}
				padding="space-12"
				borderRadius="8"
				borderWidth="1"
				borderColor="neutral-subtle"
				background="default"
				style={{ cursor: "pointer", width: "100%", minHeight: "180px" }}
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
			{isOpen && (
				<TodoDetailDialog
					availableTags={availableTags}
					originElement={triggerRef.current}
					onClose={() => setIsOpen(false)}
				/>
			)}
		</>
	);
};
