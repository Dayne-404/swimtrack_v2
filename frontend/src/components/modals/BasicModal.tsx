import { Modal, Paper, Typography, IconButton, Divider, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ReactNode } from 'react';

interface Props {
	isOpen?: boolean;
	handleClose?: () => void;
	children: ReactNode;
}

const BasicModal = ({ isOpen = false, handleClose, children }: Props) => {
  return (
		<Modal open={isOpen} onClose={handleClose}>
			<Paper
				elevation={0}
				sx={{
					position: 'absolute',
					p: 2,
					boxSizing: 'border-box',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '95%',
					height: '90vh',
					overflow: 'auto',
				}}
			>
				<Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
					<Typography variant="h5">Filters</Typography>
					<IconButton onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</Stack>
				<Divider />
				<Stack mt={3} mb={3} spacing={2}>
					{children}
				</Stack>
			</Paper>
		</Modal>
	);
};

export default BasicModal;
