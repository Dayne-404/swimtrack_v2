import { TableBody, TableCell, TableRow, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StudentRow from './StudentRow';

interface Props {
	students: Student[];
	skills: string[];
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
	isEditing?: boolean;
	disabled?: boolean;
}

const WorksheetTableBody = ({ students, skills, setStudents, isEditing, disabled }: Props) => {
	const addStudent = () => {
		const newStudent: Student = {
			name: '',
			skills: Array(skills.length).fill(false),
			passed: false,
		};

		setStudents((prev) => {
			return prev ? [...prev, newStudent] : [newStudent];
		});
	};

	return (
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
			{(students.length < 11) && (
				<TableRow sx={{ width: 300, height: 65 }}>
					<TableCell colSpan={999} sx={{paddingX: 0}}>
						<Button
							disabled={disabled || !isEditing}
							variant="contained"
							onClick={addStudent}
							startIcon={<AddIcon />}
						>
							Add Student
						</Button>
					</TableCell>
				</TableRow>
			)}
		</TableBody>
	);
};

export default WorksheetTableBody;
