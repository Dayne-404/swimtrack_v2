// components/auth/LoginForm.tsx
import { Button, Stack, Box } from '@mui/material';
import LoginTextField from './LoginTextField';
import PasswordField from './PasswordField';
import RememberMeCheckbox from './RememberMeCheckbox';
import LoadingButton from '../inputs/buttons/LoadingButton';
import { stackStyle } from '../../styles/loginStyle';

type Props = {
	userCredentials: { email: string; password: string };
	errors: { email: string; password: string; login: string };
	loading: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => Promise<void>;
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
