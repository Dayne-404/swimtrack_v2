import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import Title from '../components/common/Title';
import { backgroundStyle, containerStyle } from '../styles/loginStyle';

import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useLoginForm } from '../hooks/useLoginForm';

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
			navigate('/');
		}
	};

	useEffect(() => {
		if (!authLoading && accessToken && user) {
			console.log('User is already logged in, redirecting to dashboard');
			navigate('/');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if ((authLoading && !formLoading) || accessToken || user) {
		return null;
	}

	return (
		<Box sx={backgroundStyle}>
			<Paper sx={containerStyle}>
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
