// components/auth/PasswordField.tsx
import { TextField, InputAdornment, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

type Props = {
	value: string;
	error: { password: string; login: string };
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
};

const PasswordField = ({ value, error, onChange, disabled }: Props) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<TextField
			placeholder="Password"
			name="password"
			value={value}
			onChange={onChange}
			error={!!error.password || !!error.login}
			helperText={error.login + ' ' + error.password || ' '}
			disabled={disabled}
			fullWidth
			type={showPassword ? 'text' : 'password'}
			margin="none"
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<LockIcon />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		/>
	);
};

export default PasswordField;
