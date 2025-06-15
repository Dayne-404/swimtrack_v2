import { TableBody } from '@mui/material';
import StudentRow from './StudentRow';

interface Props {
	students: Student[];
	skills: string[];
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>;
	disabled?: boolean;
}

const WorksheetTableBody = ({ students, skills, setWorksheet, disabled }: Props) => (
	<TableBody>
		{students.map((student, index) => (
			<StudentRow
				key={student._id ?? index}
				student={student}
				index={index}
				skills={skills}
				setWorksheet={setWorksheet}
				disabled={disabled}
			/>
		))}
	</TableBody>
);

export default WorksheetTableBody;
