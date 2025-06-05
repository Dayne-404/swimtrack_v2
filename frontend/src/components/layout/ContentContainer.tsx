import {Paper } from '@mui/material';
import type { ReactNode } from 'react';

interface ViewPaperProps {
	children?: ReactNode
	maxHeight?: number;
	flex?: number;
}

const ContentContainer = ({
	children,
    flex = 1,
	maxHeight,
}: ViewPaperProps) => {
	const paperStyle = {
		display: 'flex',
		padding: 1.5,
		maxHeight: maxHeight ? `${maxHeight}vh` : 'none',
		flex: flex,
	};

	return <Paper sx={paperStyle}>{children}</Paper>;
};

export default ContentContainer