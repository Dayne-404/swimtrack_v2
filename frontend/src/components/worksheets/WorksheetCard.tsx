import { Paper, Box, Typography, ButtonBase, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../common/utils/formatDate';
import { LEVELS } from '../../common/constants/levels';
import { WORKSHEET_DATA } from '../../common/constants/worksheetData';

interface Props {
	worksheet: Worksheet;
	showInstructor?: boolean;
	showUpdatedAt?: boolean;
	disabled?: boolean;
	selected?: boolean;
    onClick?: () => void;
}

const WorksheetCard = ({
	worksheet,
	showInstructor = false,
	showUpdatedAt = false,
	disabled = false,
	selected = false,
    onClick
}: Props) => {
	const navigate = useNavigate();

	const { _id, level, session, year, location, day, time, createdAt, updatedAt, user } =
		worksheet;

	const levelLabel = LEVELS[level]?.name || 'Unknown Level';
	const sessionLabel = WORKSHEET_DATA.session[session];
	const locationLabel = WORKSHEET_DATA.location[location];
	const dayLabel = WORKSHEET_DATA.day[day];
	const instructorName = `${user.firstName} ${user.lastName?.[0] ?? ''}`;

	const handleClick = () => navigate(_id);

	return (
		<ButtonBase
			sx={{ width: '100%', textAlign: 'left' }}
			onClick={onClick ? onClick : handleClick}
			disabled={disabled}
			aria-label={`View worksheet for ${levelLabel}`}
		>
			<Paper
				elevation={2}
				sx={{
					width: '100%',
					backgroundColor: selected ? 'grey.300' : 'inherit',
					transition: 'background-color 0.3s',
				}}
			>
				<Box p={2} >
					<Typography variant="h6">{levelLabel}</Typography>
					<Divider />
					{showInstructor && (
						<Typography variant="body1">{instructorName}</Typography>
					)}
					<Typography variant="body1">
						{sessionLabel} {year}
					</Typography>
					<Typography variant="body1" gutterBottom>
						{locationLabel} {dayLabel} {time}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Created on: {formatDate(createdAt)}
					</Typography>
					{showUpdatedAt && (
						<Typography variant="body2" color="text.secondary">
							Last Updated: {formatDate(updatedAt)}
						</Typography>
					)}
				</Box>
			</Paper>
		</ButtonBase>
	);
};

export default WorksheetCard;
