import { Stack } from '@mui/material';
import BasicModal from './BasicModal';
import FilterSelect from '../inputs/select/FilterSelect';
import FilterTextField from '../inputs/textField/FilterTextField';
import WORKSHEET_DATA from '../../common/constants/worksheetData';
import ActiveFilters from '../misc/ActiveFilters';
import { PROGRAM_NAMES } from '../../common/constants/programs';

interface Props {
	isOpen?: boolean;
	handleClose?: () => void;
}

const FilterModal = ({ isOpen, handleClose }: Props) => {
	return (
		<BasicModal isOpen={isOpen} handleClose={handleClose}>
			<Stack mt={3} mb={3} spacing={2}>
				<FilterSelect placeholder="Level" field='level' items={PROGRAM_NAMES} />
				<Stack direction="row" spacing={1}>
					<FilterSelect placeholder="Session" field='session' items={WORKSHEET_DATA.sessions} />
					<FilterSelect placeholder="Day" field='day' items={WORKSHEET_DATA.days} />
				</Stack>
				<Stack direction="row" spacing={1}>
					<FilterTextField placeholder="Year" field="year" />
					<FilterSelect placeholder="Location" field='location' items={WORKSHEET_DATA.locations} />
					<FilterTextField placeholder="Time" field="time" />
				</Stack>
        <ActiveFilters />
			</Stack>
		</BasicModal>
	);
};

export default FilterModal;
