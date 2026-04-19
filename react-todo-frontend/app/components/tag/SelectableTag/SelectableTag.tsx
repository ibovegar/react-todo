import { CheckmarkIcon } from "@navikt/aksel-icons";
import { Tag } from "@navikt/ds-react";

import type { TodoTag } from "~/api";

interface SelectableTagProps {
	tag: TodoTag;
	selected: boolean;
	onClick: () => void;
}

export const SelectableTag = (props: SelectableTagProps) => {
	const { tag, selected, onClick } = props;

	return (
		<Tag
			variant={selected ? "strong" : "moderate"}
			size="small"
			data-color={tag.color}
			style={{ cursor: "pointer" }}
			onClick={onClick}
		>
			{selected && <CheckmarkIcon aria-hidden />}
			{tag.name}
		</Tag>
	);
};
