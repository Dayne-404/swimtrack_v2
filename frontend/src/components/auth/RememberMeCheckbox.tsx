// components/auth/RememberMeCheckbox.tsx
import { FormControlLabel, Checkbox } from '@mui/material';

type Props = {
	disabled?: boolean;
};

const RememberMeCheckbox = ({ disabled }: Props) => {
	return (
		<FormControlLabel
			control={<Checkbox />}
			label="Remember me"
			disabled={disabled}
		/>
	);
};

export default RememberMeCheckbox;
