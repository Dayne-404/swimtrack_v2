import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { LoginPage } from './routes/LoginPage';
import { AuthProvider } from './providers/AuthProvider';
import { UserProvider } from './providers/UserProvider';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedPage.tsx.tsx';
import { DashboardRoute } from './routes/DashboardPage.tsx';

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
