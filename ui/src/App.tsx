import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material';

import DataProvider from './store/DataProvider';
import Clients from './pages/Clients/Clients';

export default function App() {
	const theme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: 'none',
					},
				},
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						backgroundColor: '#fff',
						input: { padding: '12px 14px' },
					},
				},
			},
		},
	});

	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				<DataProvider>
					<Router>
						<Routes>
							<Route path='/' element={<Clients />} />
							<Route path='/Clients' element={<Clients />} />
						</Routes>
					</Router>
				</DataProvider>
			</ThemeProvider>
		</div>
	);
}
