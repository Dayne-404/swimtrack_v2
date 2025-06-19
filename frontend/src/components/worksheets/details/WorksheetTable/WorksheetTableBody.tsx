import { TableBody } from '@mui/material';
import StudentRow from './StudentRow';

interface Props {
	students: Student[];
	skills: string[];
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>;
	isEditing?: boolean;
}

const WorksheetTableBody = ({ students, skills, setWorksheet, isEditing }: Props) => (
	<TableBody>
		{students.map((student, index) => (
			<StudentRow
				key={student._id ?? index}
				student={student}
				index={index}
				skills={skills}
				setWorksheet={setWorksheet}
				isEditing={students.length > 1 && isEditing}
			/>
		))}
	</TableBody>
);

export default WorksheetTableBody;
