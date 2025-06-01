import {
	Drawer,
	Box,
	List,
	useTheme,
} from '@mui/material';
import UserProfileQuickAccess from './UserProfileQuickAccess';

// import SideNavItem from './SideNavItem';
// import ProfileCard from '../cards/ProfileCard';

interface SideNavbarProps {
	open: boolean;
	smallWidth: number;
	largeWidth: number;
	routes: object;
	isMediumOrBelow: boolean;
	onDrawerToggle: () => void;
};

const DRAWER_SX = {
	flexShrink: 0,
}

const DRAWER_PAPER_SX = {
	height: '100vh',
	display: 'flex',
	justifyContent: 'space-between',
	boxSizing: 'border-box',
}

export const SideNavbar = ({
	open,
	smallWidth,
	largeWidth,
	onDrawerToggle,
	isMediumOrBelow,
	routes,
}: SideNavbarProps) => {
	const theme = useTheme();

	return (
		<Drawer
			variant={isMediumOrBelow ? 'temporary' : 'permanent'}
			open={isMediumOrBelow ? open : true}
			onClose={isMediumOrBelow ? onDrawerToggle : undefined}
			sx={{
				width: isMediumOrBelow ? smallWidth : largeWidth,
				...DRAWER_SX,
				['& .MuiDrawer-paper']: {
					width: isMediumOrBelow ? smallWidth : largeWidth,
					pt: theme.spacing(10),
					...DRAWER_PAPER_SX,
				},
			}}
		>
			<Box p={1} textAlign="center">
				<List>
					{Object.entries(routes).map(([key, {icon, to}]) => (
						<SideNavItem
							key={key}
							label={key}
							icon={icon}
							to={to}
						/>
					))}
				</List>
			</Box>
			
			<UserProfileQuickAccess />
		</Drawer>
	);
};

export default SideNavbar;