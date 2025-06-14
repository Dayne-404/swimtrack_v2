import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Box,
	TextField,
	InputAdornment,
	Checkbox,
} from '@mui/material';
import { LEVELS } from '../../../common/constants/levels';

interface Props {
	worksheet: Worksheet;
	setWorksheet: React.Dispatch<React.SetStateAction<Worksheet | null>>;
	disabled?: boolean;
}

const SKILL_TEXT_BOX_WIDTH = 220; // Width of the skill text box
const SKILL_TEXT_BOX_BOTTOM = 20; // Bottom offset for the skill text box
const SKILL_CELL_HEIGHT = SKILL_TEXT_BOX_WIDTH + SKILL_TEXT_BOX_BOTTOM; // Height of the skill cell

const SKILL_TEXT_BOX_SX = {
	position: 'absolute',
	bottom: SKILL_TEXT_BOX_BOTTOM,
	left: '50%',
	transform: 'rotate(-60deg)',
	transformOrigin: 'bottom left',
	width: SKILL_TEXT_BOX_WIDTH,
	whiteSpace: 'wrap',
};

const SKILL_CELL_SX = {
    minWidth: `${SKILL_TEXT_BOX_WIDTH * 0.3}px`,
	height: SKILL_CELL_HEIGHT,
	position: 'relative',
};

const WorksheetBody = ({ worksheet, disabled }: Props) => {
	const skills = LEVELS[worksheet.level].skills;

	const SkillCheckbox = ({
		checked,
		onChange,
	}: {
		checked: boolean;
		onChange: () => void;
	}) => (
		<TableCell align="center" sx={{ padding: '2px' }}>
			<Checkbox disabled={disabled} checked={checked} onChange={onChange} />
		</TableCell>
	);

	const WorksheetTableHead = () => (
		<TableHead>
			<TableRow>
				<TableCell sx={SKILL_CELL_SX}>
					<Box
						sx={{
							position: 'absolute',
							bottom: SKILL_TEXT_BOX_BOTTOM,
							left: '50%',
							transform: 'translateX(-50%)',
							textAlign: 'center',
							whiteSpace: 'nowrap',
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							width: SKILL_TEXT_BOX_WIDTH,
						}}
					>
						Name
					</Box>
				</TableCell>
				{skills.map((skill, index) => (
					<TableCell sx={SKILL_CELL_SX} key={index}>
						<Box sx={SKILL_TEXT_BOX_SX}>
							{index + 1}. {skill}
						</Box>
					</TableCell>
				))}
				<TableCell sx={SKILL_CELL_SX}>
					<Box sx={SKILL_TEXT_BOX_SX}>Passed</Box>
				</TableCell>
			</TableRow>
		</TableHead>
	);

	const WorksheetTableBody = () => (
		<TableBody>
			{worksheet.students.map((student, index) => (
				<TableRow key={student._id || index}>
					<TableCell sx={{ position: 'relative', minWidth: `${SKILL_TEXT_BOX_WIDTH}px` }}>
						<TextField
							disabled={disabled}
							variant="standard"
							placeholder="Name"
							value={student.name}
							slotProps={{
								input: {
									startAdornment: (
										<InputAdornment position="start">
											{index + 1}.
										</InputAdornment>
									),
								},
							}}
						/>
					</TableCell>
					{skills.map((_, skillIndex) => (
						<SkillCheckbox
							key={skillIndex}
							checked={student.skills[skillIndex]}
							onChange={() => {}}
						/>
					))}
					<SkillCheckbox checked={student.passed} onChange={() => {}} />
				</TableRow>
			))}
		</TableBody>
	);

	return (
		<Box sx={{ width: '100%', overflowX: 'auto' }}>
			<TableContainer sx={{ minWidth: '100%' }}>
				<Table>
					<WorksheetTableHead />
					<WorksheetTableBody />
				</Table>
			</TableContainer>
		</Box>
	);
};

export default WorksheetBody;
