import { render, screen } from '@testing-library/react';

import DataProvider from '../../store/DataProvider';
import CreateClientDialog from './CreateClientDialog';

// unfinished
describe('CreateClientDialog', () => {
	it('displays create client data dialog', () => {
		render(
			<DataProvider>
				<CreateClientDialog showClientForm={true} setShowClientForm={jest.fn()} />
			</DataProvider>
		);

		expect(screen.getByText('Create new client')).toBeInTheDocument();
	});
});
