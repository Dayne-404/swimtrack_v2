import { createTheme, colors } from '@mui/material';
import '../css/fonts.css';

const theme = createTheme({
	palette: {
		primary: {
			main: colors.blue[700],
		},
	},
	typography: {
		fontFamily: 'Lexend, Arial, Sans-serif',
	},
});

export default theme;
