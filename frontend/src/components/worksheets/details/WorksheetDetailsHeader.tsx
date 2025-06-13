import { Stack, TextField, Grid, Divider } from '@mui/material';
import WorksheetSelect from '../../inputs/select/WorksheetSelect';
import { WORKSHEET_DATA } from '../../../common/constants/worksheetData';

interface Props {
	worksheet: Worksheet;
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>;
	disabled?: boolean;
}

const GRID_SIZE = { xs: 6, md: 3 };

const WorksheetDetailsHeader = ({ worksheet, setWorksheet, disabled = true }: Props) => {
	const handleChange = (event: string | number, field: keyof Worksheet) => {
		setWorksheet((prevWorksheet) => {
			if (!prevWorksheet) return prevWorksheet;
			return {
				...prevWorksheet,
				[field]: event,
			};
		});
	};

	return (
		<Stack>
			<Stack direction="row" spacing={1}>
				<TextField
					disabled
					label="Instructor"
					defaultValue={worksheet.user.firstName + ' ' + worksheet.user.lastName}
					slotProps={{ input: { readOnly: true } }}
					helperText=" "
					sx={{ width: '150%' }}
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
					selected={worksheet.level}
					field="level"
					items={WORKSHEET_DATA.level}
					handleChange={handleChange}
					disabled={disabled}
				/>
				<WorksheetSelect
					label="Session"
					field="session"
					selected={worksheet.session}
					items={WORKSHEET_DATA.session}
					handleChange={handleChange}
					disabled={disabled}
				/>
			</Stack>
			<Grid container>
				<Grid size={GRID_SIZE} p={0.5}>
					<TextField
						disabled={disabled}
						fullWidth
						label="Year"
						type="number"
						value={worksheet.year}
						helperText={' '}
					/>
				</Grid>
				<Grid size={GRID_SIZE} p={0.5}>
					<WorksheetSelect
						label="Day"
						field="day"
						selected={worksheet.day}
						items={WORKSHEET_DATA.day}
						handleChange={handleChange}
						disabled={disabled}
					/>
				</Grid>
				<Grid size={GRID_SIZE} p={0.5}>
					<TextField
						disabled={disabled}
						fullWidth
						label="Time"
						value={worksheet.time || ''}
						helperText={' '}
					/>
				</Grid>
				<Grid size={GRID_SIZE} p={0.5}>
					<WorksheetSelect
						label="Location"
						field="location"
						handleChange={handleChange}
						selected={worksheet.location}
						items={WORKSHEET_DATA.location}
						disabled={disabled}
					/>
				</Grid>
			</Grid>
			<Divider />
		</Stack>
	);
};

export default WorksheetDetailsHeader;
