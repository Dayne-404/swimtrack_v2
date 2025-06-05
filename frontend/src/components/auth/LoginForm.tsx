// components/auth/LoginForm.tsx
import { Button, Stack, Box } from '@mui/material';
import LoginTextField from './LoginTextField';
import PasswordField from './PasswordField';
import RememberMeCheckbox from './RememberMeCheckbox';
import LoadingButton from '../buttons/LoadingButton';

type Props = {
	userCredentials: { email: string; password: string };
	errors: { email: string; password: string; login: string };
	loading: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => Promise<void>;
};

const stackStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '80%',
	px: 2,
	pt: 3,
};

const LoginForm = ({ userCredentials, errors, loading, onChange, onSubmit }: Props) => {
	return (
		<Stack sx={stackStyle}>
			<LoginTextField
				value={userCredentials.email}
				error={{ email: errors.email, login: !!errors.login }}
				onChange={onChange}
				disabled={loading}
			/>

			<PasswordField
				value={userCredentials.password}
				error={{ password: errors.password, login: errors.login }}
				onChange={onChange}
				disabled={loading}
			/>

			<Box mt={1}>
				<RememberMeCheckbox disabled={loading} />
			</Box>

			<Stack spacing={1} mt={2}>
				<LoadingButton
					text="Sign In"
					fullwidth
					loading={loading}
					disabled={loading}
					varient="contained"
					onClick={onSubmit}
				/>
				<Stack direction="row" justifyContent="space-between">
					<Button disabled={loading}>Sign Up</Button>
					<Button disabled={loading}>Forgot Password</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default LoginForm;
