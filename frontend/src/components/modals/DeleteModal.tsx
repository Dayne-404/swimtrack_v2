import type React from 'react';
import LoadingButton from '../inputs/buttons/LoadingButton';
import BasicModal from './BasicModal';
import { Stack, Button } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children?: ReactNode;
	title?: string;
	loading?: boolean;
	onCancel?: () => void;
	handleDelete: () => void;
}

const DeleteModal = ({
	open,
	setOpen,
	children,
	title = 'Are you sure you want to delete?',
	loading = false,
	onCancel,
	handleDelete,
}: Props) => {
	return (
		<BasicModal
			isOpen={open}
			handleClose={() => setOpen(false)}
			height="auto"
			width="35%"
			title={title}
		>
			<Stack pt={2} spacing={2}>
				{children}
				<Stack direction="row" spacing={2}>
					<Button
						fullWidth
						variant="outlined"
						disabled={loading}
						onClick={() => {
							if (onCancel) {
								onCancel();
							} else {
								setOpen(false);
							}
						}}
					>
						Cancel
					</Button>
					<LoadingButton
						disabled={loading}
						loading={loading}
						text="Delete Forever"
						color="error"
						onClick={handleDelete}
					/>
				</Stack>
			</Stack>
		</BasicModal>
	);
};

export default DeleteModal;
