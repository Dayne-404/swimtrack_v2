import { TextField, useTheme } from '@mui/material';
import { useState } from 'react';
import { useFilter } from '../../../contexts/FilterContext';
import type { WorksheetFilters } from '../../../contexts/FilterContext';

interface Props {
	placeholder: string;
	field: keyof WorksheetFilters;
	validation?: { text: string; method: (value: string) => string };
	submitKey?: string;
	size?: 'medium' | 'small';
}

const FilterTextField = ({
	placeholder,
	size = 'medium',
	submitKey = 'Enter',
	field,
	validation,
}: Props) => {
	const [value, setValue] = useState<string>('');
	const [error, setError] = useState<string>('');

	const theme = useTheme();
	const { updateFilter } = useFilter();

	const onKeyUp = (keyPressed: string) => {
		if (keyPressed != submitKey) return;

		if (validation?.method && !validation.method(value)) {
			setError(validation.text);
		}

		updateFilter(field, value);
	};

	return (
		<TextField
			size={size}
			placeholder={placeholder}
			error={!!error}
			helperText={error ?? ''}
			fullWidth
			value={value}
			onKeyUp={(e) => onKeyUp(e.key)}
			onChange={(e) => setValue(e.target.value)}
			slotProps={{
				formHelperText: {
					sx: {
						position: 'absolute',
						bottom: '-20px',
						left: 10,
						margin: 0,
						fontSize: '0.75rem',
					},
				},
			}}
			sx={{
				'& .MuiInputBase-input::placeholder': {
					color: theme.palette.text.secondary,
					opacity: 1,
				},
			}}
		/>
	);
};

export default FilterTextField;
