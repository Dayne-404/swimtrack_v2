import { Typography } from "@mui/material";
import BasicModal from "./BasicModal";

interface Props {
	isOpen?: boolean;
	handleClose?: () => void;
}

const SortModal = ({isOpen, handleClose}: Props) => {
  return (
    <BasicModal title='Sorting' isOpen={isOpen} handleClose={handleClose}>
        <Typography>Hello World</Typography>
    </BasicModal>
  );
};

export default SortModal;