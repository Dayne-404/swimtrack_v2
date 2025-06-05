// components/auth/LoginTextField.tsx
import { TextField, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

type Props = {
	value: string;
	error: { email: string; login: boolean };
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
};

const LoginTextField = ({ value, error, onChange, disabled }: Props) => {
	return (
		<TextField
			placeholder="Email"
			name="email"
			value={value}
			onChange={onChange}
			error={!!error.email || error.login}
			helperText={error.email || ' '}
			disabled={disabled}
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<EmailIcon />
						</InputAdornment>
					),
				},
			}}
			fullWidth
			margin="none"
		/>
	);
};

export default LoginTextField;
