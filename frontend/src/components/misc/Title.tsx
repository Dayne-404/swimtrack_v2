import PoolOutlinedIcon from '@mui/icons-material/PoolOutlined';
import { Stack, Typography } from '@mui/material';

const Title = () => {
	return (
		<Stack direction="row" alignItems="center" justifyContent={'center'} spacing={0.5}>
			<PoolOutlinedIcon sx={{fontSize: '2.5rem'}} color="primary" />
			<Typography
				variant="h4"
				component="div"
				sx={{
					fontWeight: 700,
					fontSize: '2rem',
					textAlign: 'center',
				}}
			>
				SwimTrack
			</Typography>
		</Stack>
	);
};

export default Title;