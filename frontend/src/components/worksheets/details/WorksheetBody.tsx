import { Box, Table, TableContainer } from '@mui/material';
import { LEVELS } from '../../../common/constants/levels';
import WorksheetTableHead from './WorksheetTable/WorksheetTableHead';
import WorksheetTableBody from './WorksheetTable/WorksheetTableBody';
interface Props {
	worksheet: Worksheet;
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>;
	disabled?: boolean;
}

const WorksheetBody = ({ worksheet, setWorksheet, disabled }: Props) => {
	const skills = LEVELS[worksheet.level].skills;

	return (
		<Box sx={{ width: '100%', overflowX: 'auto' }}>
			<TableContainer sx={{ minWidth: '100%' }}>
				<Table>
					<WorksheetTableHead skills={skills} />
					<WorksheetTableBody
						students={worksheet.students}
						setWorksheet={setWorksheet}
						skills={skills}
						disabled={disabled}
					/>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default WorksheetBody;
