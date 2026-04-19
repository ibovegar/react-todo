import { Box } from "@navikt/ds-react";
import styles from "./ExpandModal.module.css";

interface ExpandModalProps {
	isClosing: boolean;
	animationStyle: React.CSSProperties | undefined;
	modalRef: (node: HTMLDivElement | null) => void;
	onAnimationEnd: (e: React.AnimationEvent) => void;
	onClose: () => void;
	children: React.ReactNode;
}

export const ExpandModal = (props: ExpandModalProps) => {
	const {
		isClosing,
		animationStyle,
		modalRef,
		onAnimationEnd,
		onClose,
		children,
	} = props;

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: stopPropagation to prevent click bubbling
		<div
			role="presentation"
			className={styles.wrapper}
			onClick={(e) => e.stopPropagation()}
		>
			<button
				type="button"
				className={`${styles.backdrop} ${isClosing ? styles.closing : ""}`}
				onClick={onClose}
				aria-label="Close"
			/>
			<Box
				ref={modalRef}
				className={`${styles.panel} ${isClosing ? styles.closing : ""}`}
				onAnimationEnd={onAnimationEnd}
				padding="space-12"
				borderRadius="8"
				background="default"
				style={animationStyle}
			>
				{children}
			</Box>
		</div>
	);
};
