import { Stack, CircularProgress } from "@mui/material";

const LoadingSpinner = () => {
	return (
		<Stack width="100%" alignItems="center" pt={5}>
			<CircularProgress size={60} />
		</Stack>
	);
};

export default LoadingSpinner;