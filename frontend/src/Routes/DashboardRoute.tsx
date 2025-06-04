import { useUser } from '../contexts/UserContext';

export const DashboardRoute = () => {
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
				</div>
			) : (
				<p>No user information available.</p>
			)}
		</div>
	);
};
