import { BodyLong, HStack, LinkCard, Tag, VStack } from "@navikt/ds-react";
import { useRef, useState } from "react";
import type { Todo, TodoTag } from "~/api";
import { CreateTodoCard } from "../CreateTodoCard";
import { TodoDetailDialog } from "../TodoDetailDialog";
import styles from "./TodoList.module.css";

interface TodoListProps {
	todos: Todo[];
	availableTags: TodoTag[];
	showCreate?: boolean;
}

export const TodoList = (props: TodoListProps) => {
	const { todos, availableTags, showCreate } = props;
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const originElementRef = useRef<HTMLElement | null>(null);
	const selectedTodo = selectedId
		? todos.find((t) => t.id === selectedId)
		: undefined;

	function handleCardClick(e: React.MouseEvent, todoId: string) {
		e.preventDefault();
		originElementRef.current = e.currentTarget as HTMLElement;
		setSelectedId(todoId);
	}

	return (
		<VStack gap="space-20">
			<div className={styles.masonry}>
				{showCreate && (
					<div className={styles.masonryItem}>
						<CreateTodoCard availableTags={availableTags} />
					</div>
				)}
				{todos.map((todo) => (
					<div key={todo.id} className={styles.masonryItem}>
						<LinkCard
							className={styles.card}
							onClick={(e) => handleCardClick(e, todo.id)}
						>
							<VStack gap="space-12">
								<LinkCard.Title>
									<LinkCard.Anchor href="#">{todo.title}</LinkCard.Anchor>
								</LinkCard.Title>
								<HStack gap="space-2" wrap>
									{todo.tags.map((tag) => (
										<Tag
											key={tag.name}
											variant="moderate"
											size="small"
											data-color={tag.color}
										>
											{tag.name}
										</Tag>
									))}
								</HStack>
								<BodyLong
									style={{
										display: "-webkit-box",
										WebkitLineClamp: 4,
										WebkitBoxOrient: "vertical",
										overflow: "hidden",
									}}
								>
									{todo.description}
								</BodyLong>
							</VStack>
						</LinkCard>
					</div>
				))}
			</div>
			{selectedTodo && originElementRef.current && (
				<TodoDetailDialog
					todo={selectedTodo}
					availableTags={availableTags}
					originElement={originElementRef.current}
					onClose={() => {
						originElementRef.current = null;
						setSelectedId(null);
					}}
				/>
			)}
		</VStack>
	);
};
