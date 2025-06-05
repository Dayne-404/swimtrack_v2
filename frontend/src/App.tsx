import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { LoginPage } from './pages/LoginPage.tsx';
import { AuthProvider } from './providers/AuthProvider';
import { UserProvider } from './providers/UserProvider';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ProtectedPage } from './pages/ProtectedPage.tsx.tsx';
import { ALL_ROUTES } from './routes/appRoutes.tsx';
import Navigation from './components/navigation/Navigation.tsx';
import { Box } from '@mui/material';
import ContentContainer from './components/layout/ContentContainer.tsx';
import { MainStyle } from './styles/appStyle.ts';

function App() {
	return (
		<UserProvider>
			<AuthProvider>
				<ThemeProvider theme={theme}>
					<Router>
						<Routes>
							<Route path="/login" element={<LoginPage />} />
							{Object.values(ALL_ROUTES).map((route, index) => (
								<Route
									key={`route-${index}`}
									path={route.to}
									element={
										<ProtectedPage>
											<Navigation />
											<Box sx={MainStyle}>
												<ContentContainer>
													{route.element}
												</ContentContainer>
											</Box>
										</ProtectedPage>
									}
								/>
							))}
						</Routes>
					</Router>
				</ThemeProvider>
			</AuthProvider>
		</UserProvider>
	);
}

export default App;
