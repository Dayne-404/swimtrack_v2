import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
	AppBar,
	ButtonBase,
	IconButton,
	Stack,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';

interface NavbarProps {
	isMediumOrBelow: boolean;
	height: number;
	onDrawerToggle: () => void;
}

const APP_BAR_SX = {
	backgroundColor: 'white',
	color: 'black',
	boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
};

const TOOLBAR_SX = {
	display: 'flex',
	justifyContent: 'space-between',
	position: 'relative',
	height: '100%',
};

const TYPOGRAPHY_SX = {
	fontWeight: 700,
	textAlign: 'center',
};

const Navbar = ({ isMediumOrBelow, height, onDrawerToggle }: NavbarProps) => {
	const theme = useTheme();

	return (
		<AppBar sx={{ ...APP_BAR_SX, height: height + 'px', zIndex: theme.zIndex.drawer + 1 }}>
			<Toolbar sx={TOOLBAR_SX}>
				{isMediumOrBelow && (
					<IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle}>
						<MenuIcon />
					</IconButton>
				)}
				<Stack
					direction="row"
					alignItems="center"
					justifyContent={isMediumOrBelow ? 'center' : 'flex-start'}
				>
					<ButtonBase>
						<PoolOutlinedIcon
							fontSize={isMediumOrBelow ? 'medium' : 'large'}
							color="primary"
						/>
						<Typography
							variant="h4"
							component="div"
							sx={{
								...TYPOGRAPHY_SX,
								fontSize: isMediumOrBelow ? '1.25rem' : '1.75rem',
							}}
						>
							SwimTrack
						</Typography>
					</ButtonBase>
				</Stack>
				<Stack direction="row" spacing={isMediumOrBelow ? 0 : 2}>
					{/* <LogoutButton /> */}
					<IconButton color="inherit" aria-label="notifications">
						<NotificationsIcon />
					</IconButton>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
