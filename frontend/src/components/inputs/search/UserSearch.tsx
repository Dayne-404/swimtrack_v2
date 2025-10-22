import {
	Autocomplete,
	TextField,
	ListItem,
	ListItemAvatar,
	ListItemText,
	InputAdornment,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useApi } from '../../../common/hooks/useApi';
import UserAvatar from '../../common/UserAvatar';

interface Props {
	label?: string;
	disabled?: boolean;
	size?: 'small' | 'medium';
	multiple?: boolean;
	selected: User[];
	helperText?: string;
	showSelectedInside?: boolean;
	onChange: (users: User[]) => void;
}

const UserSearch = ({
	label,
	disabled = false,
	size = 'medium',
	multiple = false,
	helperText = ' ',
	selected,
	showSelectedInside = true,
	onChange,
}: Props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [users, setUsers] = useState<User[]>([]);

	const { apiRequest } = useApi();

	useEffect(() => {
		console.log('fetch');

		const fetchUsers = async () => {
			try {
				const params = new URLSearchParams({ search: searchTerm });
				const fetchedUsers = await apiRequest({
					endpoint: '/users',
					params: { filters: params },
				});
				setUsers(fetchedUsers as User[]);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		};

		fetchUsers();
	}, [searchTerm, apiRequest]);

	const handleChange = (_: unknown, newValue: User | User[] | null) => {
		const newUsers = Array.isArray(newValue) ? newValue : newValue ? [newValue] : [];
		onChange(newUsers);
	};

	const renderOptionContent = (props: React.HTMLAttributes<HTMLLIElement>, user: User) => (
		<ListItem {...props} key={user._id}>
			<ListItemAvatar>
				<UserAvatar
					firstName={user.firstName}
					lastName={user.lastName}
					avatarColor={user.avatarColor}
				/>
			</ListItemAvatar>
			<ListItemText
				primary={`${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`}
			/>
		</ListItem>
	);

	const getStartAdornment = () => {
		if (multiple || selected.length === 0) return null;
		const user = selected[0];
		return (
			<InputAdornment position="start">
				<UserAvatar
					firstName={user.firstName}
					lastName={user.lastName}
					avatarColor={user.avatarColor}
				/>
			</InputAdornment>
		);
	};

	return (
		<Autocomplete
			disabled={disabled}
			size={size}
			fullWidth
			multiple={multiple}
			options={users}
			openOnFocus
			value={multiple ? selected : selected[0] ?? null}
			getOptionLabel={(user) =>
				`${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`
			}
			isOptionEqualToValue={(option, val) => option._id === val._id}
			onInputChange={(_, newValue) => setSearchTerm(newValue)}
			onChange={handleChange}
			forcePopupIcon={false}
			renderValue={showSelectedInside ? undefined : () => null}
			renderInput={(params) => (
				<TextField
					{...params}
					label={label}
					variant="outlined"
					fullWidth
					helperText={helperText}
					error={helperText?.trim() !== ''}
					slotProps={{
						input: {
							...params.InputProps,
							startAdornment: getStartAdornment() ?? params.InputProps.startAdornment,
						},
					}}
				/>
			)}
			renderOption={renderOptionContent}
		/>
	);
};

export default UserSearch;
