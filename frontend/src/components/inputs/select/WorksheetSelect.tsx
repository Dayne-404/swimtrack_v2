import { TextField, MenuItem } from '@mui/material';
import React from 'react';

interface Props {
	label: string;
	field: WorksheetSelectableKeys;
	size?: 'medium' | 'small';
	selected: number;
	placeholder?: string;
	items?: string[];
	disabled?: boolean;
	handleChange?: (value: number, field: keyof WorksheetFormData) => void;
}

const ITEM_HEIGHT = 48;
const MAX_ITEMS_DISPLAYED = 5;

const SelectMenuProps = {
	MenuProps: {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * MAX_ITEMS_DISPLAYED,
			},
		},
	},
};

const WorksheetSelectComponent = ({
	label,
	field,
	size = 'medium',
	items = [],
	selected,
	handleChange = () => {},
	disabled = true,
}: Props) => {
	return (
		<TextField
			select
			size={size}
			label={label}
			value={selected}
			onChange={(e) => handleChange(Number(e.target.value), field)}
			helperText={' '}
			disabled={disabled}
			fullWidth
			slotProps={{ select: SelectMenuProps }}
		>
			{items.map((item, index) => (
				<MenuItem key={`${item}-${index}`} value={index} disabled={index === selected}>
					{item}
				</MenuItem>
			))}
		</TextField>
	);
};

const WorksheetSelect = React.memo(WorksheetSelectComponent);

export default WorksheetSelect;
