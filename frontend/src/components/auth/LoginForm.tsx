// components/auth/LoginForm.tsx
import { Button, Stack, Box } from '@mui/material';
import LoginTextField from './LoginTextField';
import PasswordField from './PasswordField';
import RememberMeCheckbox from './RememberMeCheckbox';
import LoadingButton from '../buttons/LoadingButton';

type Props = {
	userCredentials: { email: string; password: string };
	errors: { email: string; password: string };
	loading: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: () => Promise<void>;
};

const LoginForm = ({
	userCredentials,
	errors,
	loading,
	onChange,
	onSubmit,
}: Props) => {
	return (
		<Stack sx={{ px: 2, pt: 3, width: '80%', margin: '0 auto' }}>
                <LoginTextField
                    value={userCredentials.email}
                    error={errors.email}
                    onChange={onChange}
                    disabled={loading}
                />
                
                <PasswordField
                    value={userCredentials.password}
                    error={errors.password}
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
