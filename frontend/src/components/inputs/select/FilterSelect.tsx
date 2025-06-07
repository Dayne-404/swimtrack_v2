import { Select, MenuItem, useTheme } from '@mui/material';
import { useFilter } from '../../../contexts/FilterContext';
import type { WorksheetFilters } from '../../../contexts/FilterContext';

interface Props {
	field: keyof WorksheetFilters;
	size?: 'medium' | 'small';
	placeholder?: string;
	items?: string[];
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

const FilterSelect = ({
	size = 'medium',
	placeholder = 'Placeholder',
	items = [],
	field,
}: Props) => {
	const { filters, updateFilter } = useFilter();
	const theme = useTheme();

	const handleSelect = (selectedItem: string) => {
		const selectedItemIndex = Number(selectedItem);

		if (selectedItemIndex) updateFilter(field, selectedItemIndex);
	};

	return (
		<Select
			size={size}
			value=""
			onChange={(e) => handleSelect(e.target.value)}
			displayEmpty
			fullWidth
			MenuProps={SelectMenuProps.MenuProps}
		>
			<MenuItem value="" disabled>
				<span style={{ color: theme.palette.text.secondary }}>{placeholder}</span>
			</MenuItem>
			{items.map((item, index) => (
				<MenuItem
					key={`${item}-${index}`}
					value={index}
					disabled={(filters[field] as number[]).includes(index)}
				>
					{item}
				</MenuItem>
			))}
		</Select>
	);
};

export default FilterSelect;
