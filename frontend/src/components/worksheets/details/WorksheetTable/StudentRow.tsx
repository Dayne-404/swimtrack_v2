import { TableRow, TableCell, TextField, InputAdornment, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SkillCheckbox from './SkillCheckbox';
import { SKILL_TEXT_BOX_WIDTH } from '../../../../styles/tableStyle';

interface Props {
	student: Student;
	index: number;
	skills: string[];
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>;
	isEditing?: boolean;
}

const handleNameChange = (
	index: number,
	newName: string,
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>
) => {
	setWorksheet((prev) => {
		if (!prev) return prev;
		const updatedStudents = [...prev.students];
		updatedStudents[index] = { ...updatedStudents[index], name: newName };
		return { ...prev, students: updatedStudents };
	});
};

const handleSkillChange = (
	studentIndex: number,
	skillIndex: number,
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>
) => {
	setWorksheet((prev) => {
		if (!prev) return prev;
		const updatedStudents = [...prev.students];
		const student = { ...updatedStudents[studentIndex] };
		const skills = [...student.skills];
		skills[skillIndex] = !skills[skillIndex];
		const passed = skills.every(Boolean);
		updatedStudents[studentIndex] = { ...student, skills, passed };
		return { ...prev, students: updatedStudents };
	});
};

const handlePassedChange = (
	studentIndex: number,
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>
) => {
	setWorksheet((prev) => {
		if (!prev) return prev;
		const updatedStudents = [...prev.students];
		const student = { ...updatedStudents[studentIndex] };
		const passed = !student.passed;
		const skills = passed ? Array(student.skills.length).fill(true) : student.skills;
		updatedStudents[studentIndex] = { ...student, passed, skills };
		return { ...prev, students: updatedStudents };
	});
};

const handleStudentRemove = (
	studentIndex: number,
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>
) => {
	setWorksheet((prev) => {
		if (!prev) return prev;

		const updatedStudents = prev.students.filter((_, index) => index !== studentIndex);

		return {
			...prev,
			students: updatedStudents,
		};
	});
};

const StudentRow = ({ student, index, skills, setWorksheet, isEditing }: Props) => (
	<TableRow key={student._id ?? `row-${index}`}>
		{isEditing && (
			<TableCell padding="none">
				<IconButton
					color="primary"
					onClick={() => handleStudentRemove(index, setWorksheet)}
				>
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
				onChange={(e) => handleNameChange(index, e.target.value, setWorksheet)}
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
				onChange={() => handleSkillChange(index, skillIndex, setWorksheet)}
				disabled={!isEditing}
			/>
		))}
		<SkillCheckbox
			checked={student.passed}
			onChange={() => handlePassedChange(index, setWorksheet)}
			disabled={!isEditing}
		/>
	</TableRow>
);

export default StudentRow;
