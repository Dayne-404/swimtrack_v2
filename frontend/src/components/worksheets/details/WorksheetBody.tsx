import { Box, Table, TableContainer } from '@mui/material';
import { LEVELS } from '../../../common/constants/levels';
import WorksheetTableHead from './WorksheetTable/WorksheetTableHead';
import WorksheetTableBody from './WorksheetTable/WorksheetTableBody';
interface Props {
	worksheet: Worksheet;
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>;
	isEditing?: boolean;
}

const WorksheetBody = ({ worksheet, setWorksheet, isEditing }: Props) => {
	const skills = LEVELS[worksheet.level].skills;

	return (
		<Box sx={{ width: '100%', overflowX: 'auto' }}>
			<TableContainer sx={{ minWidth: '100%' }}>
				<Table>
					<WorksheetTableHead skills={skills} isEditing={isEditing} />
					<WorksheetTableBody
						students={worksheet.students}
						setWorksheet={setWorksheet}
						skills={skills}
						isEditing={isEditing}
					/>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default WorksheetBody;
