import type { SxProps } from '@mui/material';
import theme from './theme';

//NAVBAR STYLE

export const appBarStyle = {
    backgroundColor: 'white',
    color: 'black',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
};

export const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    height: '100%',
};

export const textStyle = {
    fontWeight: 700,
    textAlign: 'center',
};

//SIDENAV ITEM

export const itemTextStyle = {
	typography: {
		xs: 'body2',
		sm: 'body1',
		md: 'h6',
	},
};

//SIDENAV STYLE

export const sideNavStyle: SxProps = {
	flexShrink: 0,
};

export const sideNavDrawerStyle = {
	height: '100vh',
	display: 'flex',
	justifyContent: 'space-between',
	boxSizing: 'border-box',
};

//PROFILE QUICK ACCESS STYLE

export const buttonBaseStyle: SxProps = {
	display: 'flex',
	flexDirection: 'row',
	gap: theme.spacing(1),
	padding: theme.spacing(0.5),
	flexGrow: 1,
	justifyContent: 'flex-start',
};

export const nameTextStyle: SxProps = {
	fontSize: {
		xs: '1rem',
		sm: '1rem',
	},
};

export const profileTextStyle: SxProps = {
	fontSize: {
		xs: '0.75rem',
		sm: '0.75rem',
	},
	color: theme.palette.text.secondary,
};
