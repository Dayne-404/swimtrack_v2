import { Avatar, ButtonBase } from '@mui/material';
import { useUser } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

interface Props {
	firstName?: string;
	lastName?: string;
	avatarColor?: string;
	linkToProfile?: boolean;
}

const UserAvatar = ({ firstName, lastName, avatarColor, linkToProfile = false }: Props) => {
	const { user } = useUser();
	const navigate = useNavigate();

	const firstInitial = firstName ?? user?.firstName ?? '';
	const lastInitial = lastName ?? user?.lastName ?? '';
	const bgcolor = avatarColor ?? user?.avatarColor ?? 'primary';

	const avatar = (
		<Avatar sx={{ bgcolor }}>{`${firstInitial[0] ?? ''}${lastInitial[0] ?? ''}`}</Avatar>
	);

	if (linkToProfile) {
		return (
			<ButtonBase disableRipple onClick={() => navigate('/settings')}>
				{avatar}
			</ButtonBase>
		);
	}

	return avatar;
};

export default UserAvatar;
