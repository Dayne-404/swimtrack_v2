import { Drawer, Box, List, useTheme } from '@mui/material';
import UserProfileQuickAccess from './ProfileQuickAccess';
import SideNavbarItem from './SideNavbarItem';

import { LARGE_SIDE_WIDTH, SMALL_SIDE_WIDTH } from '../../common/constants/navigationSize';
import { SIDE_NAV_ROUTES } from '../../routes/sideNavRoutes';
import { sideNavDrawerStyle, sideNavStyle } from '../../styles/navigationStyle';

interface Props {
	open: boolean;
	isMediumOrBelow: boolean;
	onDrawerToggle: () => void;
}

const SideNavbar = ({ open, onDrawerToggle, isMediumOrBelow }: Props) => {
	const theme = useTheme();
	const drawerWidth = isMediumOrBelow ? SMALL_SIDE_WIDTH : LARGE_SIDE_WIDTH;

	return (
		<Drawer
			variant={isMediumOrBelow ? 'temporary' : 'permanent'}
			open={isMediumOrBelow ? open : true}
			onClose={isMediumOrBelow ? onDrawerToggle : undefined}
			sx={{
				width: drawerWidth,
				...sideNavStyle,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					pt: theme.spacing(10),
					...sideNavDrawerStyle,
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
