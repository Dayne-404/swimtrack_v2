import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { LoginPage } from './Routes/LoginRoute';
import { AuthProvider } from './providers/AuthProvider';
import { UserProvider } from './providers/UserProvider';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import { DashboardRoute } from './Routes/DashboardRoute';

function App() {
	return (
		<UserProvider>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<Routes>
							<Route path="/login" element={<LoginPage />} />
							<Route
								path="/dashboard"
								element={
									<ProtectedRoute>
										<DashboardRoute />
									</ProtectedRoute>
								}
							/>
						</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</AuthProvider>
		</UserProvider>
	);
}

export default App;
