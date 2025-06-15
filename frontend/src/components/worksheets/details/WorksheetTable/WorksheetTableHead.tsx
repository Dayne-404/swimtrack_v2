import { TableHead, TableRow, TableCell, Box } from '@mui/material';
import { SKILL_CELL_SX, SKILL_TEXT_BOX_SX, SKILL_TEXT_BOX_WIDTH, SKILL_TEXT_BOX_BOTTOM } from '../../../../styles/TableStyle';

const WorksheetTableHead = ({ skills }: { skills: string[] }) => (
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

export default WorksheetTableHead;
