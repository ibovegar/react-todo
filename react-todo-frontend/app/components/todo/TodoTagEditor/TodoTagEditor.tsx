import { HStack } from "@navikt/ds-react";
import { useMemo } from "react";
import type { TodoTag } from "~/api";
import { getUnusedTags } from "~/utils";
import { RemovableTag } from "../../tag/RemovableTag";
import { TagPicker } from "../../tag/TagPicker";

interface TodoTagEditorProps {
	tags: TodoTag[];
	availableTags: TodoTag[];
	onAdd: (tag: TodoTag) => void;
	onRemove: (tagName: string) => void;
}

export const TodoTagEditor = (props: TodoTagEditorProps) => {
	const { tags, availableTags, onAdd, onRemove } = props;
	const unusedTags = useMemo(
		() => getUnusedTags(availableTags, tags),
		[availableTags, tags],
	);

	return (
		<HStack gap="space-2" wrap align="center">
			{tags.map((tag) => (
				<RemovableTag key={tag.name} tag={tag} onRemove={onRemove} />
			))}
			{unusedTags.length > 0 && (
				<TagPicker
					unusedTags={unusedTags}
					hasExistingTags={tags.length > 0}
					onAdd={onAdd}
				/>
			)}
		</HStack>
	);
};
