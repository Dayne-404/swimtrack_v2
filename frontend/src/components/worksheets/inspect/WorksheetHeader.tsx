import { Stack, TextField, Grid, Divider } from '@mui/material';
import WorksheetSelect from '../../inputs/select/WorksheetSelect';
import { WORKSHEET_DATA } from '../../../common/constants/worksheetData';
import { LEVELS } from '../../../common/constants/levels';
import UserSearch from '../../inputs/search/UserSearch';
import { useUser } from '../../../contexts/UserContext';
import { toStandardTime } from '../../../common/utils/time';

interface Props {
	worksheetUser: User[];
	setWorksheetUser: React.Dispatch<React.SetStateAction<User[]>>;
	worksheetForm: WorksheetFormData;
	setWorksheetForm: React.Dispatch<React.SetStateAction<WorksheetFormData>>;
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
	validationErrors?: WorksheetValidationErrors;
	disabled?: boolean;
}

const GRID_SIZE = { xs: 6, md: 3 };

const WorksheetHeader = ({
	worksheetUser,
	setWorksheetUser,
	worksheetForm,
	setWorksheetForm,
	setStudents,
	validationErrors,
	disabled = true,
}: Props) => {
	const { user } = useUser();

	const handleChange = (value: number | string, field: keyof WorksheetFormData) => {
		setWorksheetForm((prev) => {
			return {
				...prev,
				[field]: value,
			};
		});
	};

	const handleLevelChange = (value: number) => {
		//TODO add modal are you sure?

		setWorksheetForm((prev) => {
			return {
				...prev,
				level: value,
			};
		});

		setStudents((prev) => {
			return prev.map((student) => {
				return {
					...student,
					skills: Array(LEVELS[value].skills.length || 0).fill(false),
					passed: false,
				};
			});
		});
	};

	return (
		<Stack>
			<Stack direction="row" spacing={1}>
				{/* <TextField
					disabled
					label="Instructor"
					defaultValue={worksheetUser[0].firstName + ' ' + (worksheetUser[0].lastName ?? ' ')}
					slotProps={{ input: { readOnly: true } }}
					helperText=" "
					sx={{ width: '150%' }}
				/> */}
				<UserSearch
					label="Instructor"
					disabled={disabled || (!!user && user.role === 'instructor')}
					selected={worksheetUser}
					onChange={setWorksheetUser}
					helperText={validationErrors?.user}
				/>

				{/* TODO come back and fix this */}
				{/* <Button
					disabled={disabled}
					variant="outlined"
					startIcon={<CreateNewFolderIcon />}
					fullWidth
					sx={{ height: '56px' }}
					onClick={() => setModalOpen(true)}
				>
					Add to Group
				</Button> *
				<AddToGroupModal
					selectedGroups={selectedGroups}
					setSelectedGroups={setSelectedGroups}
					open={modalOpen}
					setOpen={setModalOpen}
					instructorId={user.id}
				/>
                */}
			</Stack>
			<Stack direction="row" spacing={1}>
				<WorksheetSelect
					label="Level"
					selected={worksheetForm.level}
					field="level"
					items={WORKSHEET_DATA.level}
					handleChange={handleLevelChange}
					disabled={disabled}
					helperText={validationErrors?.level}
				/>
				<WorksheetSelect
					label="Session"
					field="session"
					selected={worksheetForm.session}
					items={WORKSHEET_DATA.session}
					handleChange={handleChange}
					disabled={disabled}
					helperText={validationErrors?.session}
				/>
			</Stack>
			<Grid container>
				<Grid size={GRID_SIZE} p={0.5}>
					<TextField
						disabled={disabled}
						fullWidth
						label="Year"
						onChange={(e) => handleChange(e.target.value, 'year')}
						value={toStandardTime(worksheetForm.year)}
						helperText={validationErrors?.year || ' '}
						error={!!validationErrors?.year || false}
					/>
				</Grid>
				<Grid size={GRID_SIZE} p={0.5}>
					<WorksheetSelect
						label="Day"
						field="day"
						selected={worksheetForm.day}
						items={WORKSHEET_DATA.day}
						handleChange={handleChange}
						disabled={disabled}
						helperText={validationErrors?.day}
					/>
				</Grid>
				<Grid size={GRID_SIZE} p={0.5}>
					<TextField
						disabled={disabled}
						fullWidth
						label="Time"
						onChange={(e) => handleChange(e.target.value, 'time')}
						value={worksheetForm.time || ''}
						helperText={validationErrors?.time || ' '}
						error={!!validationErrors?.time || false}
					/>
				</Grid>
				<Grid size={GRID_SIZE} p={0.5}>
					<WorksheetSelect
						label="Location"
						field="location"
						handleChange={handleChange}
						selected={worksheetForm.location}
						items={WORKSHEET_DATA.location}
						disabled={disabled}
						helperText={validationErrors?.location}
					/>
				</Grid>
			</Grid>
			<Divider />
		</Stack>
	);
};

export default WorksheetHeader;
