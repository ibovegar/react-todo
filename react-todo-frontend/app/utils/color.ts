import type { TagColor } from "~/models/tag";

export type AkselColor =
	| "neutral"
	| "accent"
	| "info"
	| "success"
	| "warning"
	| "danger"
	| "brand-magenta"
	| "brand-beige"
	| "brand-blue"
	| "meta-purple"
	| "meta-lime";

const colorMap: Record<TagColor, AkselColor> = {
	color_1: "neutral",
	color_2: "accent",
	color_3: "info",
	color_4: "success",
	color_5: "warning",
	color_6: "danger",
	color_7: "brand-magenta",
	color_8: "brand-beige",
	color_9: "brand-blue",
	color_10: "meta-purple",
	color_11: "meta-lime",
};

export function toAkselColor(color: TagColor): AkselColor {
	return colorMap[color];
}
