import { Box, Table, TableContainer } from '@mui/material';
import { LEVELS } from '../../../common/constants/levels';
import WorksheetTableHead from './WorksheetTable/WorksheetTableHead';
import WorksheetTableBody from './WorksheetTable/WorksheetTableBody';
interface Props {
	worksheet: Worksheet;
	students: Student[] | null;
	setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>;
	disabled?: boolean;
}

const WorksheetBody = ({ worksheet, students, setStudents, disabled }: Props) => {
	if (!students) {
		return (
			<Box sx={{ width: '100%', textAlign: 'center', padding: 2 }}>Loading students...</Box> //TODO change this
		);
	}

	const skills = LEVELS[worksheet.level].skills;

	return (
		<Box sx={{ width: '100%', overflowX: 'auto' }}>
			<TableContainer sx={{ minWidth: '100%' }}>
				<Table>
					<WorksheetTableHead skills={skills} />
					<WorksheetTableBody
						students={students}
						skills={skills}
						setStudents={setStudents}
						disabled={disabled}
					/>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default WorksheetBody;
