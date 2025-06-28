import { TableRow, TableCell, TextField, InputAdornment, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SkillCheckbox from './SkillCheckbox';
import { SKILL_TEXT_BOX_WIDTH } from '../../../../styles/tableStyle';

interface Props {
	student: Student;
	index: number;
	skills: string[];
	validationError?: boolean;
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
	isEditing?: boolean;
}

const handleNameChange = (
	index: number,
	newName: string,
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
	setStudents((prev) => {
		const updated = [...prev];
		updated[index] = {
			...updated[index],
			name: newName,
		};

		return updated;
	});
};

const handleSkillChange = (
	studentIndex: number,
	skillIndex: number,
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
	setStudents((prev) => {
		const updatedStudents = [...prev];
		const student = { ...updatedStudents[studentIndex] };
		const skills = [...student.skills];
		skills[skillIndex] = !skills[skillIndex];
		const passed = skills.every(Boolean);
		updatedStudents[studentIndex] = { ...student, skills, passed };
		return updatedStudents;
	});
};

const handlePassedChange = (
	studentIndex: number,
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
	setStudents((prev) => {
		const updatedStudents = [...prev];
		const student = { ...updatedStudents[studentIndex] };
		const passed = !student.passed;
		const skills = passed ? Array(student.skills.length).fill(true) : student.skills;
		updatedStudents[studentIndex] = { ...student, passed, skills };
		return updatedStudents;
	});
};

const handleStudentRemove = (
	studentIndex: number,
	setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) => {
	setStudents((prev) => {
		return prev.filter((_, index) => index !== studentIndex);
	});
};

const StudentRow = ({ student, index, skills, validationError, setStudents, isEditing }: Props) => (
	<TableRow key={student._id ?? `row-${index}`}>
		{isEditing && (
			<TableCell padding="none">
				<IconButton color="primary" onClick={() => handleStudentRemove(index, setStudents)}>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		)}
		<TableCell sx={{ position: 'relative', minWidth: `${SKILL_TEXT_BOX_WIDTH}px` }}>
			<TextField
				disabled={!isEditing}
				variant="standard"
				placeholder="Name"
				value={student.name}
				error={validationError || false}
				onChange={(e) => handleNameChange(index, e.target.value, setStudents)}
				slotProps={{
					input: {
						startAdornment: (
							<InputAdornment position="start">{index + 1}.</InputAdornment>
						),
					},
				}}
			/>
		</TableCell>
		{skills.map((_, skillIndex) => (
			<SkillCheckbox
				key={`skill-${skillIndex}`}
				checked={student.skills[skillIndex]}
				onChange={() => handleSkillChange(index, skillIndex, setStudents)}
				disabled={!isEditing}
			/>
		))}
		<SkillCheckbox
			checked={student.passed}
			onChange={() => handlePassedChange(index, setStudents)}
			disabled={!isEditing}
		/>
	</TableRow>
);

export default StudentRow;
