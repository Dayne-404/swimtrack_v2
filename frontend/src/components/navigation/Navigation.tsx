import { useState, useEffect } from 'react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';
import theme from '../../styles/theme';

import { NAVBAR_HEIGHT } from '../../common/constants/navigationSize';

import { useMediaQuery } from '@mui/material';

const Navigation = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const isMediumOrBelow = useMediaQuery(theme.breakpoints.down('md'));

	const handleDrawerToggle = () => {
		setDrawerOpen(!drawerOpen);
	};

	useEffect(() => {
		if (isMediumOrBelow) {
			setDrawerOpen(false); // Ensure drawer is closed on small screens
		}
	}, [isMediumOrBelow]);

	return (
		<>
			<TopNavbar
				isMediumOrBelow={isMediumOrBelow}
				height={NAVBAR_HEIGHT}
				onDrawerToggle={handleDrawerToggle}
			/>
			<SideNavbar
				open={drawerOpen}
				onDrawerToggle={handleDrawerToggle}
				isMediumOrBelow={isMediumOrBelow}
			/>
		</>
	);
};

export default Navigation;
