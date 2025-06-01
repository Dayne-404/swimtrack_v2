// components/auth/LoginTextField.tsx
import { TextField, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

type Props = {
	value: string;
	error: string;
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
			error={!!error}
			helperText={error || ' '}
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
			margin="dense"
		/>
	);
};

export default LoginTextField;
