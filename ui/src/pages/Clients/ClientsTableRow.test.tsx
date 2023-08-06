import { render, screen } from '@testing-library/react';
import ClientsTableRow from './ClientsTableRow';

describe('ClientsTableRow', () => {
	it('displays the table row with client data', () => {
		const clientData = {
			id: 'xyz-1234',
			firstName: 'John',
			lastName: 'Doe',
			email: 'john.doe@example.com',
			phoneNumber: '+6391677777',
		};

		render(<ClientsTableRow client={clientData} />);

		expect(
			screen.getByRole('rowheader', { name: `${clientData.firstName} ${clientData.lastName}` })
		).toBeInTheDocument();
		expect(screen.getByRole('cell', { name: clientData.phoneNumber })).toBeInTheDocument();
		expect(screen.getByRole('cell', { name: clientData.email })).toBeInTheDocument();
	});
});
