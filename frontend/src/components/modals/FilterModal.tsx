import { Stack } from '@mui/material';
import BasicModal from './BasicModal';
import FilterSelect from '../inputs/select/FilterSelect';
import FilterTextField from '../inputs/textField/FilterTextField';
import { WORKSHEET_DATA } from '../../common/constants/worksheetData';
import ActiveFilters from '../worksheets/ActiveFilters';
import { validateYear, validateTime } from '../../common/utils/validation';

interface Props {
	isOpen?: boolean;
	handleClose?: () => void;
}

const FilterModal = ({ isOpen, handleClose }: Props) => {
	return (
		<BasicModal title='Filters' isOpen={isOpen} handleClose={handleClose}>
			<Stack mt={3} mb={3} spacing={2}>
				<FilterSelect
					placeholder="Programs"
					field="level"
					items={WORKSHEET_DATA.level}
				/>
				<Stack direction="row" spacing={1}>
					<FilterSelect
						placeholder="Session"
						field="session"
						items={WORKSHEET_DATA.session}
					/>
					<FilterSelect placeholder="Days" field="day" items={WORKSHEET_DATA.day} />
				</Stack>
				<Stack direction="row" spacing={1}>
					<FilterTextField
						placeholder="Years"
						field="year"
						validation={{ text: 'Time must be in format XXXX', method: validateYear }}
					/>
					<FilterSelect
						placeholder="Location"
						field="location"
						items={WORKSHEET_DATA.location}
					/>
					<FilterTextField
						placeholder="Times"
						field="time"
						validation={{ text: 'Time must be in format XX:XX', method: validateTime }}
					/>
				</Stack>
				<ActiveFilters />
			</Stack>
		</BasicModal>
	);
};

export default FilterModal;
