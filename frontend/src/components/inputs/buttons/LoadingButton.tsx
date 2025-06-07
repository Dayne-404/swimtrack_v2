import { Button, CircularProgress } from '@mui/material';

interface Props {
	text: string;
	color?: 'primary' | 'error';
	onClick: () => void | Promise<void>;
	loading?: boolean;
	fullwidth?: boolean;
	disabled?: boolean;
	varient?: 'contained' | 'outlined';
	startIcon?: React.ReactElement;
}

const LoadingButton = ({
	text,
	loading,
	color = 'primary',
	fullwidth = false,
	varient = 'outlined',
	disabled,
	startIcon,
	onClick,
}: Props) => {
	return (
		<>
			<Button
				variant={varient}
				color={color}
				startIcon={startIcon}
				onClick={onClick}
				fullWidth={fullwidth}
				disabled={loading || disabled}
				sx={{ position: 'relative' }}
			>
				{text}
				{loading && (
					<CircularProgress
						size={24}
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							marginTop: '-12px',
							marginLeft: '-12px',
						}}
					/>
				)}
			</Button>
		</>
	);
};

export default LoadingButton;
