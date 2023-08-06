import axios from 'axios';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { clientDataMock } from '../../constants';
import Clients from './Clients';
import DataProvider from '../../store/DataProvider';

describe('Clients', () => {
	it('display the clients page', async () => {
		render(<Clients />, { wrapper: ({ children }) => <DataProvider>{children}</DataProvider> });

		expect(screen.getByText('Clients')).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Create new client' })).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('table')).toBeInTheDocument();
	});

	// unfinished tests
	it('search for the client', async () => {
		jest.spyOn(axios, 'get').mockResolvedValue({
			data: clientDataMock,
		});

		render(
			<DataProvider>
				<Clients />
			</DataProvider>
		);

		// const searchBox = screen.getByPlaceholderText('Search clients...');

		// userEvent.type(searchBox, 'joh');

		await waitFor(async () => console.log((await screen.findByRole('table')).innerHTML));

		// expect(await screen.findAllByRole('row')).toHaveLength(3);
	});
});
