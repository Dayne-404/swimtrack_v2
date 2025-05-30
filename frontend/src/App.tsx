import { ThemeProvider } from '@emotion/react';
import theme from './styles/theme';
import { Typography } from '@mui/material';

function App() {
	return (
		<ThemeProvider theme={theme}>
      <Typography>Hello World!</Typography>
		</ThemeProvider>
	);
}

export default App;
