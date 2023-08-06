import { ChangeEvent, memo, useContext, useEffect, useState, FunctionComponent } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import SearchRounded from '@mui/icons-material/SearchRounded';

import { StateContext } from '../../store/DataProvider';
import { getClients } from '../../services/api';
import CreateClientDialog from '../../components/CreateClientDialog/CreateClientDialog';

import ClientTable from './ClientsTable';
import { mainContainerActionBarStyle, mainContainerStyle } from './Clients.css';

const Clients: FunctionComponent = () => {
	const { state, dispatch } = useContext(StateContext);
	const { clients } = state;

	const [showClientForm, setShowClientForm] = useState(false);
	const [filteredClients, setFilteredClients] = useState(clients);

	const handleSearch = (searchString: string) => {
		setFilteredClients(
			clients.filter((client) =>
				searchString !== ''
					? client.firstName.toLowerCase().includes(searchString.toLowerCase()) ||
					  client.lastName.toLowerCase().includes(searchString.toLowerCase())
					: true
			)
		);
	};

	useEffect(() => {
		setFilteredClients(clients);
	}, [clients]);

	useEffect(() => {
		getClients().then((clients) => {
			dispatch({ type: 'FETCH_ALL_CLIENTS', data: clients });
		});
	}, [dispatch]);

	return (
		<Container sx={mainContainerStyle}>
			<Typography variant='h4'>Clients</Typography>
			<Stack sx={mainContainerActionBarStyle} direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1 }}>
				<TextField
					placeholder='Search clients...'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<SearchRounded />
							</InputAdornment>
						),
					}}
					variant='outlined'
					onChange={(event: ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)}
				/>
				<Button variant='contained' type='button' onClick={() => setShowClientForm(true)}>
					Create new client
				</Button>
				<CreateClientDialog showClientForm={showClientForm} setShowClientForm={setShowClientForm} />
			</Stack>
			<ClientTable clients={filteredClients} />
		</Container>
	);
};

export default memo(Clients);
