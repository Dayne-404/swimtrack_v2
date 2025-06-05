import { useLoginForm } from '../hooks/useLoginForm';
import { Paper, Box } from '@mui/material';
import { colors } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import Title from '../components/misc/Title';

import { useAuth } from '../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUser } from '../contexts/UserContext';

export const LoginPage = () => {
	const {
		userCredentials,
		errors,
		loading: formLoading,
		setLoading: setFormLoading,
		handleChange,
		validateCredentials,
	} = useLoginForm();

	const { login, loading: authLoading, loginError, accessToken } = useAuth();
	const { user } = useUser();

	const navigate = useNavigate();

	const handleSubmit = async () => {
		if (!validateCredentials()) return;

		setFormLoading(true);
		const success = await login(userCredentials.email, userCredentials.password);

		setFormLoading(false);
		if (success) {
			navigate('/dashboard');
		}
	};

	useEffect(() => {
		if (!authLoading && accessToken && user) {
			console.log('User is already logged in, redirecting to dashboard');
			navigate('/dashboard');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const loginContainerStyle = {
		position: 'relative',
		p: 2,
		py: 4,
		boxSizing: 'border-box',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: {
			xs: '90%',
			md: '60%',
			lg: '30%',
			xl: '20%',
		},
		height: {
			xs: '70vh',
			md: '60vh',
		},
		minHeight: {
			xs: '500px',
			md: '600px',
		},
	};

	const backgroundStyle = {
		height: '100vh',
		width: '100%',
		background: `linear-gradient(135deg, ${colors.lightBlue[800]}, ${colors.lightBlue[300]})`,
	};

	if ((authLoading && !formLoading) || accessToken || user) {
		return null;
	}

	return (
		<Box sx={backgroundStyle}>
			<Paper sx={loginContainerStyle}>
				<Title />
				<LoginForm
					userCredentials={userCredentials}
					loading={formLoading}
					onChange={handleChange}
					onSubmit={handleSubmit}
					errors={{ ...errors, login: loginError }}
				/>
			</Paper>
		</Box>
	);
};
