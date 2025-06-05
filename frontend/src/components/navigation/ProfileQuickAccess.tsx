import { Stack, IconButton, ButtonBase, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import { useUser } from '../../contexts/UserContext';
import UserAvatar from '../misc/UserAvatar';

import { buttonBaseStyle, nameTextStyle, profileTextStyle } from '../../styles/navigationStyle';

const UserProfileQuickAccess = () => {
	const navigate = useNavigate();

	const { user } = useUser();

	return (
		<Stack direction="row" p={1.5}>
			<ButtonBase sx={buttonBaseStyle} onClick={() => navigate('/profile')}>
				<UserAvatar />
				<Stack>
					<Typography variant="subtitle1" sx={nameTextStyle}>
						{user?.firstName}
					</Typography>
					<Typography variant="body2" sx={profileTextStyle}>
						View profile
					</Typography>
				</Stack>
			</ButtonBase>
			<IconButton
				size="large"
				aria-label="Go to settings"
				onClick={() => navigate('/settings')}
			>
				<SettingsIcon />
			</IconButton>
		</Stack>
	);
};

export default UserProfileQuickAccess;
