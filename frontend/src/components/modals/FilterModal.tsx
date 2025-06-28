import { Stack } from '@mui/material';
import BasicModal from './BasicModal';
import FilterSelect from '../inputs/select/FilterSelect';
import FilterTextField from '../inputs/textField/FilterTextField';
import { WORKSHEET_DATA } from '../../common/constants/worksheetData';
import ActiveFilters from '../worksheets/ActiveFilters';
import { validateYear, validateTime } from '../../common/utils/validation';
import { useFilter } from '../../contexts/FilterContext';
import UserSearch from '../inputs/search/UserSearch';
import { useState } from 'react';

interface Props {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	params: URLSearchParams;
	setParams: (value: URLSearchParams) => void;
}

const FilterModal = ({ isOpen, setOpen, params, setParams }: Props) => {
	const { buildFilterQuery } = useFilter();
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

	const handleClose = () => {
		const newParams = buildFilterQuery();

		selectedUsers.forEach((user) => {
			newParams.append('user', user._id);
		});

		if (params.toString() === newParams.toString()) {
			setOpen(false);
			return;
		}

		setParams(newParams);
		setOpen(false);
	};

	return (
		<BasicModal title="Filters" isOpen={isOpen} handleClose={handleClose}>
			<Stack mt={3} mb={3} spacing={2}>
				<Stack direction="row" spacing={1}>
					<UserSearch label="Instructor" selected={selectedUsers} multiple onChange={setSelectedUsers} />
					<FilterSelect
						placeholder="Program"
						field="level"
						items={WORKSHEET_DATA.level}
					/>
				</Stack>
				<Stack direction="row" spacing={1}>
					<FilterSelect
						placeholder="Session"
						field="session"
						items={WORKSHEET_DATA.session}
					/>
					<FilterSelect placeholder="Day" field="day" items={WORKSHEET_DATA.day} />
				</Stack>
				<Stack direction="row" spacing={1}>
					<FilterTextField
						placeholder="Year"
						field="year"
						validation={{ text: 'Time must be in format XXXX', method: validateYear }}
					/>
					<FilterSelect
						placeholder="Location"
						field="location"
						items={WORKSHEET_DATA.location}
					/>
					<FilterTextField
						placeholder="Time"
						field="time"
						validation={{ text: 'Time must be in format HH:MM AM/PM', method: validateTime }}
					/>
				</Stack>
				<ActiveFilters />
			</Stack>
		</BasicModal>
	);
};

export default FilterModal;
