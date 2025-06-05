import type { SxProps } from '@mui/material';
import { NAVBAR_HEIGHT, LARGE_SIDE_WIDTH } from '../common/constants/navigationSize';

export const MainStyle: SxProps = {
	display: 'flex',
	flexDirection: 'column',
	component: 'main',
	width: '100%',
	height: '100vh',
	boxSizing: 'border-box',
	padding: {
		xs: `${NAVBAR_HEIGHT + 16}px 10px 10px 10px`,
		md: `${NAVBAR_HEIGHT + 24}px 24px 24px ${LARGE_SIDE_WIDTH + 24}px`,
	},
};
