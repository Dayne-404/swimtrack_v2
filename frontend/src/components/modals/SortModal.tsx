import { Stack } from '@mui/material';
import BasicModal from './BasicModal';
import SortSelect from '../inputs/select/SortSelect';
import { useSort } from '../../contexts/SortContext';
import { SORT_LABELS_BY_FIELD } from '../../common/constants/sortingLabels';

interface Props {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	params: URLSearchParams
	setParams: (value: URLSearchParams) => void;
}

const SortModal = ({ isOpen, setOpen, params, setParams }: Props) => {
	const { sorting, buildSortQuery } = useSort();

	const handleClose = () => {
		const newParams = buildSortQuery();

		if (!params || !setParams || params.toString() === newParams.toString()) {
			setOpen(false);
			return;
		} 

		setParams(newParams);
		setOpen(false);
	};

	return (
		<BasicModal title="Sorting" isOpen={isOpen} handleClose={handleClose}>
			<Stack spacing={2} py={1.5}>
				{Object.keys(sorting).map((key) => (
					<SortSelect
						key={key}
						field={key as keyof WorksheetSortFields}
						labels={SORT_LABELS_BY_FIELD[key as keyof WorksheetSortFields]}
					/>
				))}
			</Stack>
		</BasicModal>
	);
};

export default SortModal;
