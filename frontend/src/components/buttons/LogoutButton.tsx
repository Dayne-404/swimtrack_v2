import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

	const logoutUser = async () => {
        const success = await logout();

        if (success)
            navigate('/login');
    };

	return <Button onClick={logoutUser}>Logout</Button>;
};

export default LogoutButton;