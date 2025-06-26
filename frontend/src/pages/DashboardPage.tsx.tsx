import { useUser } from '../contexts/UserContext';
import LogoutButton from '../components/inputs/buttons/LogoutButton';
import UserAvatar from '../components/common/UserAvatar';
import UserSearch from '../components/inputs/search/UserSearch';

export const DashboardPage = () => {
	const { user } = useUser();

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome to the dashboard!</p>
			{user ? (
				<div>
					<h2>User Information</h2>
					<p>FirstName: {user.firstName}</p>
					<p>LastName: {user.lastName}</p>
                    <p>_id: {user._id}</p>
                    <p>Role: {user.role}</p>
					<UserSearch handleSelect={() => {}} />
					<LogoutButton />
					<UserAvatar />
				</div>
			) : (
				<p>No user information available.</p>
			)}
		</div>
	);
};
