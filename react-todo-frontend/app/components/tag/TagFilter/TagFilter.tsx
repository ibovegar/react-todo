import { Button, HStack } from "@navikt/ds-react";
import { useState } from "react";
import type { TodoTag } from "~/models";
import { SelectableTag } from "../SelectableTag";

interface TagFilterProps {
	tags: TodoTag[];
	activeFilters: string[];
	onToggle: (tagId: string) => void;
}

export const TagFilter = (props: TagFilterProps) => {
	const { tags, activeFilters, onToggle } = props;
	const [showAll, setShowAll] = useState(false);

	const visibleTags = showAll ? tags : tags.slice(0, 5);

	return (
		<HStack gap="space-2" wrap align="center">
			{visibleTags.map((tag) => (
				<SelectableTag
					key={tag.id}
					tag={tag}
					selected={activeFilters.includes(tag.id)}
					onClick={() => onToggle(tag.id)}
				/>
			))}
			{!showAll && tags.length > 5 && (
				<Button
					variant="tertiary"
					size="small"
					onClick={() => setShowAll(true)}
				>
					{tags.length - 5} more...
				</Button>
			)}
			{showAll && tags.length > 5 && (
				<Button
					variant="tertiary"
					size="small"
					onClick={() => setShowAll(false)}
				>
					Show less
				</Button>
			)}
		</HStack>
	);
};
