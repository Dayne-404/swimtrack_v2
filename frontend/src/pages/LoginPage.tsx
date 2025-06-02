import { useLoginForm } from '../hooks/useLoginForm';
import { Paper, Box } from '@mui/material';
import { colors } from '@mui/material';
import { login } from '../utils/authorization';
import LoginForm from '../components/auth/LoginForm';
import Title from '../components/misc/Title';
import { decodeJWT } from '../utils/decodeJWT';

export const LoginPage = () => {
	const { userCredentials, errors, loading, handleChange, validateCredentials, setLoading } =
		useLoginForm();

	// const navigate = useNavigate();

	const handleSubmit = async () => {
		if (!validateCredentials()) return;

		setLoading(true);
		try {
			const data = await login(userCredentials) as { accessToken: string, refreshToken: string };
			localStorage.setItem('accessToken', data.accessToken);
            //Might want to store as http cookie down the line
            localStorage.setItem('refreshToken', data.refreshToken);

			decodeJWT(data?.accessToken);
			// navigate('/');
		} catch (error) {
			console.error(error);
		} finally {
			
			setLoading(false);
		}
	};

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

	return (
		<Box sx={backgroundStyle}>
			<Paper sx={loginContainerStyle}>
				<Title />
				<LoginForm
					userCredentials={userCredentials}
					loading={loading}
					onChange={handleChange}
					onSubmit={handleSubmit}
					errors={errors}
				/>
			</Paper>
		</Box>
	);
};
