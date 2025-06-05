import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { itemTextStyle } from '../../styles/navigationStyle';

interface SideNavItemProps {
	icon: React.ReactNode;
	label: string;
	to: string;
}

const SideNavItem = ({ label, icon, to }: SideNavItemProps) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isSelected = pathname === to;

	const activeStyle = {
		color: isSelected ? theme.palette.primary.main : 'black',
	};

	return (
		<ListItem disablePadding>
			<ListItemButton onClick={() => navigate(to)} selected={isSelected} sx={activeStyle}>
				<ListItemIcon sx={activeStyle}>{icon}</ListItemIcon>
				<ListItemText primary={label} sx={itemTextStyle} />
			</ListItemButton>
		</ListItem>
	);
};

export default SideNavItem;
