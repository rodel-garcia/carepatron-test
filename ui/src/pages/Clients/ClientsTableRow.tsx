import { FunctionComponent } from 'react';

import { TableCell, TableRow, Box } from '@mui/material';

import { tableCellInnerStyle, tableRowStyle } from './Clients.css';

const ClientsTableRow: FunctionComponent<{ client: IClient }> = ({ client }) => {
	const { id, firstName, lastName, email, phoneNumber } = client;

	return (
		<TableRow key={id} sx={tableRowStyle}>
			<TableCell component='th' scope='row'>
				{firstName} {lastName}
			</TableCell>
			<TableCell>{phoneNumber}</TableCell>
			<TableCell>
				<Box sx={tableCellInnerStyle}>{email}</Box>
			</TableCell>
		</TableRow>
	);
};

export default ClientsTableRow;
