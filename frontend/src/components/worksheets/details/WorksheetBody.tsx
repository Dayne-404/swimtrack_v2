import { Box, Table, TableContainer } from '@mui/material';
import { LEVELS } from '../../../common/constants/levels';
import WorksheetTableHead from './table/WorksheetTableHead';
import WorksheetTableBody from './table/WorksheetTableBody';
interface Props {
	level: number;
	students: Student[] | null;
	setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>;
	isEditing?: boolean;
}

const WorksheetBody = ({ level, students, setStudents, isEditing }: Props) => {
	const skills = LEVELS[level].skills;

	return (
		<Box sx={{ width: '100%', overflowX: 'auto' }}>
			<TableContainer sx={{ minWidth: '100%' }}>
				<Table>
					<WorksheetTableHead
						skills={skills}
						isEditing={!!students && students.length > 0 && isEditing}
					/>
					{students && (
						<WorksheetTableBody
							students={students}
							setStudents={setStudents}
							skills={skills}
							isEditing={isEditing}
						/>
					)}
				</Table>
			</TableContainer>
		</Box>
	);
};

export default WorksheetBody;
