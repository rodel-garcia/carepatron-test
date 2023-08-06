import { useEffect, useState, FunctionComponent, memo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

import { tableContainerStyle, tableEmptyRowStyle, tableStyle } from './Clients.css';
import ClientsTableRow from './ClientsTableRow';

const ClientsTable: FunctionComponent<{ clients: IClient[] }> = ({ clients }) => {
	const DEFAULT_PAGE_SIZE = 10;
	const STARTING_PAGE = 0;

	const [page, setPage] = useState(STARTING_PAGE);
	const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
	const [paginatedClients, setPaginatedClients] = useState(clients);

	const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
		setPaginatedClients(clients.slice(newPage * rowsPerPage, rowsPerPage * (newPage + 1)));
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(STARTING_PAGE);
	};

	useEffect(() => {
		setPaginatedClients(clients);
		if (clients?.length > DEFAULT_PAGE_SIZE) {
			setPaginatedClients(clients.slice(STARTING_PAGE, rowsPerPage));
		}
	}, [clients, rowsPerPage]);

	return (
		<>
			<TableContainer component={Paper} sx={tableContainerStyle}>
				<Table stickyHeader sx={tableStyle}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Phone number</TableCell>
							<TableCell>Email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{paginatedClients.map((client) => (
							<ClientsTableRow key={client.id} client={client} />
						))}
						{!paginatedClients ||
							(!paginatedClients.length && (
								<TableRow sx={tableEmptyRowStyle}>
									<TableCell component='th' scope='row'>
										No clients
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			{clients.length > DEFAULT_PAGE_SIZE && (
				<TablePagination
					data-testid='clients-paginator'
					component='div'
					count={clients?.length}
					page={page}
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			)}
		</>
	);
};

export default memo(ClientsTable);
