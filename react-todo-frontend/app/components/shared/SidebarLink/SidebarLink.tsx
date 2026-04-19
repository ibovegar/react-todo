import { BodyShort, Box, HStack } from "@navikt/ds-react";
import type { ComponentType, SVGProps } from "react";
import { NavLink } from "react-router";

interface SidebarLinkProps {
	to: string;
	end?: boolean;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	label: string;
}

export const SidebarLink = (props: SidebarLinkProps) => {
	const { to, end, icon: Icon, label } = props;
	return (
		<NavLink
			to={to}
			end={end}
			style={{ textDecoration: "none", color: "inherit" }}
		>
			{({ isActive }) => (
				<Box
					asChild
					padding="space-4"
					borderRadius="8"
					background={isActive ? "accent-soft" : undefined}
				>
					<HStack gap="space-4" align="center">
						<Icon aria-hidden fontSize="1.25rem" />
						<BodyShort weight={isActive ? "semibold" : "regular"}>
							{label}
						</BodyShort>
					</HStack>
				</Box>
			)}
		</NavLink>
	);
};
