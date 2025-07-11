import { Typography, ButtonBase, Stack, Chip } from '@mui/material';
import { useFilter } from '../../contexts/FilterContext';
import { WORKSHEET_DATA } from '../../common/constants/worksheetData';

const ActiveFilters = () => {
	const { filters, clearFilter } = useFilter();

	return (
		<>
			<Stack mt={2.5} direction="row" justifyContent="space-between" alignItems={'center'}>
				<Typography variant="h6" fontWeight="400">
					Active Filters
				</Typography>
				<ButtonBase onClick={() => clearFilter()} disableRipple>
					<Typography variant="body2" fontWeight="400" color="primary">
						Clear Filters
					</Typography>
				</ButtonBase>
			</Stack>

			<Stack direction="row" spacing={1} flexWrap="wrap">
				{Object.entries(filters).map(([key, values]) =>
					values.length > 0
						? values.map((value: number | string, index: number) => {
								let label = '';

								if (typeof value === 'number') {
									label =
										WORKSHEET_DATA[key as keyof typeof WORKSHEET_DATA]?.[
											value
										] ?? value.toString();
								} else {
									label = value;
								}

								return (
									<Chip
										key={`${key}-${index}-${value}`}
										onDelete={() =>
											clearFilter({
												field: key as keyof typeof WORKSHEET_DATA,
												value: value,
											})
										}
										label={label}
										color="primary"
									/>
								);
						  })
						: null
				)}
			</Stack>
		</>
	);
};

export default ActiveFilters;
