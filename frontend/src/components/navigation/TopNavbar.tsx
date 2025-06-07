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
import { appBarStyle, toolbarStyle, textStyle } from '../../styles/navigationStyle';
import LogoutButton from '../inputs/buttons/LogoutButton';
import { NAVBAR_HEIGHT } from '../../common/constants/navigationSize';

interface Props {
	isMediumOrBelow: boolean;
	onDrawerToggle: () => void;
}

const Navbar = ({ isMediumOrBelow, onDrawerToggle }: Props) => {
	const theme = useTheme();

	return (
		<AppBar
			sx={{ ...appBarStyle, height: NAVBAR_HEIGHT + 'px', zIndex: theme.zIndex.drawer + 1 }}
		>
			<Toolbar sx={toolbarStyle}>
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
								...textStyle,
								fontSize: isMediumOrBelow ? '1.25rem' : '1.75rem',
							}}
						>
							SwimTrack
						</Typography>
					</ButtonBase>
				</Stack>
				<Stack direction="row" spacing={isMediumOrBelow ? 0 : 2}>
					<LogoutButton />
					<IconButton color="inherit" aria-label="notifications">
						<NotificationsIcon />
					</IconButton>
				</Stack>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
