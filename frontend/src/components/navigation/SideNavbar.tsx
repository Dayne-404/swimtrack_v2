import { Drawer, Box, List, useTheme } from '@mui/material';
import UserProfileQuickAccess from './ProfileQuickAccess';

import SideNavbarItem from './SideNavbarItem';

interface Props {
	open: boolean;
	isMediumOrBelow: boolean;
	onDrawerToggle: () => void;
}

const DRAWER_SX = {
	flexShrink: 0,
};

const DRAWER_PAPER_SX = {
	height: '100vh',
	display: 'flex',
	justifyContent: 'space-between',
	boxSizing: 'border-box',
};

import { LARGE_SIDE_WIDTH, SMALL_SIDE_WIDTH } from '../../common/constants/navigationSize';
import { SIDE_NAV_ROUTES } from '../../routes/sideNavRoutes';

export const SideNavbar = ({ open, onDrawerToggle, isMediumOrBelow }: Props) => {
	const theme = useTheme();

	return (
		<Drawer
			variant={isMediumOrBelow ? 'temporary' : 'permanent'}
			open={isMediumOrBelow ? open : true}
			onClose={isMediumOrBelow ? onDrawerToggle : undefined}
			sx={{
				width: isMediumOrBelow ? SMALL_SIDE_WIDTH : LARGE_SIDE_WIDTH,
				...DRAWER_SX,
				['& .MuiDrawer-paper']: {
					width: isMediumOrBelow ? SMALL_SIDE_WIDTH : LARGE_SIDE_WIDTH,
					pt: theme.spacing(10),
					...DRAWER_PAPER_SX,
				},
			}}
		>
			<Box p={1} textAlign="center">
				<List>
					{Object.entries(SIDE_NAV_ROUTES).map(([key, { icon, to }]) => (
						<SideNavbarItem key={key} label={key} icon={icon} to={to} />
					))}
				</List>
			</Box>

			<UserProfileQuickAccess />
		</Drawer>
	);
};

export default SideNavbar;
