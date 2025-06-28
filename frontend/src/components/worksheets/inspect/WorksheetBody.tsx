import {
	Box,
	Table,
	TableContainer,
} from '@mui/material';
import { LEVELS } from '../../../common/constants/levels';
import StudentTableHeader from './table/StudentTableHeader';
import StudentTableBody from './table/StudentTableBody';
interface Props {
	level: number;
	students: Student[];
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
	validationErrors?: boolean[];
	isEditing?: boolean;
	disabled?: boolean;
}

const WorksheetBody = ({ level, students, setStudents, validationErrors, isEditing, disabled }: Props) => {
	const skills = LEVELS[level].skills;

	console.log('STUDENTS: ', students);

	return (
		<Box sx={{ width: '100%', overflowX: 'auto' }}>
			<TableContainer sx={{ minWidth: '100%' }}>
				<Table>
					<StudentTableHeader
						skills={skills}
						isEditing={!!students && students.length > 0 && isEditing}
					/>
					<StudentTableBody
						students={students}
						setStudents={setStudents}
						skills={skills}
						isEditing={isEditing}
						disabled={disabled}
						validationErrors={validationErrors}
					/>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default WorksheetBody;
