import { TableCell, Checkbox } from '@mui/material';
import { memo } from 'react';

const SkillCheckbox = memo(
	({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) => (
		<TableCell align="center" sx={{ padding: '2px' }}>
			<Checkbox disabled={disabled} checked={checked} onChange={onChange} />
		</TableCell>
	)
);

export default SkillCheckbox;
