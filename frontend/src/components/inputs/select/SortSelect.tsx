import { Select, MenuItem, FormControl, InputLabel, capitalize } from '@mui/material';
import { useSort } from '../../../contexts/SortContext';

interface Props {
	field: keyof WorksheetSortFields;
	labels: Record<0 | 1 | 2, string>;
	size?: 'medium' | 'small';
}

const SortSelect = ({ size = 'medium', field, labels }: Props) => {
	const { sorting, updateSorting } = useSort();
	const labelId = `sort-select-label-${field}`;

	return (
		<FormControl fullWidth size={size}>
			<InputLabel id={labelId}>{capitalize(field)}</InputLabel>
			<Select
				labelId={labelId}
				value={sorting[field]}
				onChange={(e) => updateSorting(field, e.target.value)}
				label={capitalize(field)}
			>
				{([0, 1, 2] as const).map((value) => (
					<MenuItem key={value} value={value}>
						{labels[value]}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default SortSelect;
