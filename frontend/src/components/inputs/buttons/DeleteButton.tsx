import { Button } from '@mui/material';
import { type ReactNode } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../../modals/DeleteModal';

interface Props {
	loading?: boolean;
	children?: ReactNode;
	buttonText?: string;
	title?: string;
	handleDelete: () => void;
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteButton = ({
	handleDelete,
	loading,
	title,
	children,
	buttonText,
	open,
	setOpen
}: Props) => {
	return (
		<>
			<DeleteModal
				open={open}
				setOpen={setOpen}
				title={title}
				loading={loading}
				handleDelete={handleDelete}
                children={children}
			/>
			<Button
				color="primary"
				variant="outlined"
				onClick={() => setOpen(true)}
				endIcon={buttonText && <DeleteIcon />}
			>
				{buttonText}
				{!buttonText && <DeleteIcon />}
			</Button>
		</>
	);
};

export default DeleteButton;