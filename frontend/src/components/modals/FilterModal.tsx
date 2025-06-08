import { Stack } from '@mui/material';
import BasicModal from './BasicModal';
import FilterSelect from '../inputs/select/FilterSelect';
import FilterTextField from '../inputs/textField/FilterTextField';
import { WORKSHEET_DATA } from '../../common/constants/worksheetData';
import ActiveFilters from '../misc/ActiveFilters';
import { validateYear, validateTime } from '../../utils/validation';

interface Props {
	isOpen?: boolean;
	handleClose?: () => void;
}

const FilterModal = ({ isOpen, handleClose }: Props) => {
	return (
		<BasicModal isOpen={isOpen} handleClose={handleClose}>
			<Stack mt={3} mb={3} spacing={2}>
				<FilterSelect
					placeholder="Programs"
					field="programs"
					items={WORKSHEET_DATA.programs}
				/>
				<Stack direction="row" spacing={1}>
					<FilterSelect
						placeholder="Session"
						field="sessions"
						items={WORKSHEET_DATA.sessions}
					/>
					<FilterSelect placeholder="Days" field="days" items={WORKSHEET_DATA.days} />
				</Stack>
				<Stack direction="row" spacing={1}>
					<FilterTextField
						placeholder="Years"
						field="years"
						validation={{ text: 'Time must be in format XXXX', method: validateYear }}
					/>
					<FilterSelect
						placeholder="Location"
						field="locations"
						items={WORKSHEET_DATA.locations}
					/>
					<FilterTextField
						placeholder="Times"
						field="times"
						validation={{ text: 'Time must be in format XX:XX', method: validateTime }}
					/>
				</Stack>
				<ActiveFilters />
			</Stack>
		</BasicModal>
	);
};

export default FilterModal;
