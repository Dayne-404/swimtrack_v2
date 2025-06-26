import { TableBody } from '@mui/material';
import StudentRow from './StudentRow';

interface Props {
	students: Student[];
	skills: string[];
	setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>;
	isEditing?: boolean;
}

const WorksheetTableBody = ({ students, skills, setStudents, isEditing }: Props) => (
	<TableBody>
		{students.map((student, index) => (
			<StudentRow
				key={student._id ?? index}
				student={student}
				index={index}
				skills={skills}
				setStudents={setStudents}
				isEditing={isEditing}
			/>
		))}
	</TableBody>
);

export default WorksheetTableBody;
