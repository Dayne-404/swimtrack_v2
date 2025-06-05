import { colors } from '@mui/material';

export const containerStyle = {
    position: 'relative',
    p: 2,
    py: 4,
    boxSizing: 'border-box',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {
        xs: '90%',
        md: '60%',
        lg: '30%',
        xl: '20%',
    },
    height: {
        xs: '70vh',
        md: '60vh',
    },
    minHeight: {
        xs: '500px',
        md: '600px',
    },
};

export const backgroundStyle = {
    height: '100vh',
    width: '100%',
    background: `linear-gradient(135deg, ${colors.lightBlue[800]}, ${colors.lightBlue[300]})`,
};

export const stackStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	px: 2,
	pt: 3,
};