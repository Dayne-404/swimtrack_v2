import { TableRow, TableCell, TextField, InputAdornment } from '@mui/material';
import SkillCheckbox from './SkillCheckbox';
import { SKILL_TEXT_BOX_WIDTH } from '../../../../styles/TableStyle';

interface Props {
	student: Student;
	index: number;
	skills: string[];
	setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>;
	disabled?: boolean;
}

const handleNameChange = (
	index: number,
	newName: string,
	setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>
) => {
	setStudents((prev) => {
		if (!prev) return null;
		const updated = [...prev];
		updated[index] = { ...updated[index], name: newName };
		return updated;
	});
};

const handleSkillChange = (
	studentIndex: number,
	skillIndex: number,
	setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>
) => {
	setStudents((prev) => {
		if (!prev) return null;
		const updated = [...prev];
		const student = { ...updated[studentIndex] };
		const skills = [...student.skills];
		skills[skillIndex] = !skills[skillIndex];
		const passed = skills.every(Boolean);
		updated[studentIndex] = { ...student, skills, passed };
		return updated;
	});
};

const handlePassedChange = (
	studentIndex: number,
	setStudents: React.Dispatch<React.SetStateAction<Student[] | null>>
) => {
	setStudents((prev) => {
		if (!prev) return null;
		const updated = [...prev];
		const student = { ...updated[studentIndex] };
		const passed = !student.passed;
		const skills = passed ? Array(student.skills.length).fill(true) : student.skills;
		updated[studentIndex] = { ...student, passed, skills };
		return updated;
	});
};

const StudentRow = ({ student, index, skills, setStudents, disabled }: Props) => (
	<TableRow key={student._id ?? `row-${index}`}>
		<TableCell sx={{ position: 'relative', minWidth: `${SKILL_TEXT_BOX_WIDTH}px` }}>
			<TextField
				disabled={disabled}
				variant="standard"
				placeholder="Name"
				value={student.name}
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
				disabled={disabled}
			/>
		))}
		<SkillCheckbox
			checked={student.passed}
			onChange={() => handlePassedChange(index, setStudents)}
			disabled={disabled}
		/>
	</TableRow>
);

export default StudentRow;
