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
	handleSelect: (type: string, filter: string[]) => void;
}

const UserSearch = ({
	label,
	disabled = false,
	size = 'medium',
	multiple = false,
	handleSelect,
}: Props) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<User[]>([]);
	const [value, setValue] = useState<User | User[] | null>(multiple ? [] : null);

	const { apiRequest } = useApi();

	useEffect(() => {
		const fetchUsers = async () => {
			setLoading(true);

			try {
				const searchParams = new URLSearchParams();
				searchParams.set('search', searchTerm);

				const usersData: User[] = (await apiRequest({
					endpoint: `/users`,
					params: { filters: searchParams },
				})) as User[];

				setUsers(usersData);
			} catch (error) {
				console.error('Error fetching users:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm]);

	const handleChange = (_event: React.SyntheticEvent, newValue: User | User[] | null) => {
		setValue(newValue);
		if (multiple) {
			handleSelect(
				'instructor',
				(Array.isArray(newValue) ? newValue : []).map((user) => user._id)
			);
		} else if (newValue) {
			handleSelect('instructor', [(newValue as User)._id]);
		} else {
			handleSelect('instructor', []);
		}
	};

	const handleInputChange = (_event: React.SyntheticEvent, newInputValue: string) => {
		setSearchTerm(newInputValue);
	};

	return (
		<Autocomplete
			disabled={disabled}
			size={size}
			multiple={multiple}
			fullWidth
			loading={loading}
			forcePopupIcon={false}
			options={users}
			value={value}
			getOptionLabel={(option: User) => `${option.firstName} ${option.lastName ?? ''}`}
			isOptionEqualToValue={(option: User, val: User | null) => option._id === val?._id}
			onInputChange={handleInputChange}
			onChange={handleChange}
			renderInput={(params) => {
				const selectedUser =
					!multiple && typeof value === 'object' && value !== null
						? (value as User)
						: null;

				return (
					<TextField
						{...params}
						disabled={disabled}
						label={label}
						variant="outlined"
						fullWidth
						slotProps={{
							input: {
								...params.InputProps,
								startAdornment:
									!multiple && selectedUser ? (
										<InputAdornment position="start">
											<UserAvatar
												firstName={selectedUser.firstName}
												lastName={selectedUser.lastName}
												avatarColor={selectedUser.avatarColor}
                                                
											/>
										</InputAdornment>
									) : (
										params.InputProps.startAdornment
									),
							},
						}}
					/>
				);
			}}
			renderOption={(props, user: User) => (
				<ListItem {...props} key={user._id}>
					<ListItemAvatar>
						<UserAvatar
							firstName={user.firstName}
							lastName={user.lastName}
							avatarColor={user.avatarColor}
						/>
					</ListItemAvatar>
					<ListItemText primary={`${user.firstName} ${user.lastName ?? ''}`} />
				</ListItem>
			)}
		/>
	);
};

export default UserSearch;
