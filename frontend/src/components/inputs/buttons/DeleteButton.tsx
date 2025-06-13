import { Button } from '@mui/material';
import { useState, type ReactNode } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from '../../modals/DeleteModal';

interface Props {
	loading?: boolean;
	children?: ReactNode;
	buttonText?: string;
	title?: string;
	handleDelete: () => void;
}

const DeleteButton = ({
	handleDelete,
	loading,
	title,
	children,
	buttonText,
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);

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