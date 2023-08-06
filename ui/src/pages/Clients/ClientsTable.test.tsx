import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { clientDataMock } from '../../constants';
import ClientsTable from './ClientsTable';

describe('ClientsTable', () => {
	beforeEach(() => {
		render(<ClientsTable clients={clientDataMock} />);
	});
	it('displays the table with expected number of rows', () => {
		expect(screen.getAllByRole('row')).toHaveLength(11); // 11 including the header
	});
	it('displays the table with pagination once number of rows exceeds more than 10', () => {
		expect(screen.getByTestId('clients-paginator')).toBeInTheDocument();
	});

	describe('Pagination', () => {
		it('displays the page size selector with 10 as default value', () => {
			expect(screen.getByRole('button', { name: 'Rows per page: 10' })).toBeInTheDocument();
		});
		it('displays the previous button which is initally disabled', () => {
			const previousButtonElement = screen.getByRole('button', { name: 'Go to previous page' });
			expect(previousButtonElement).toBeInTheDocument();
			expect(previousButtonElement).toHaveAttribute('disabled');
		});
		it('displays the new button which is clickable for switching next page', () => {
			const nextButtonElement = screen.getByRole('button', { name: 'Go to next page' });
			expect(nextButtonElement).toBeInTheDocument();
		});

		it('go to next page once next button is clicked', () => {
			const nextButtonElement = screen.getByRole('button', { name: 'Go to next page' });

			userEvent.click(nextButtonElement);

			expect(screen.getAllByRole('row')).toHaveLength(2); // 2 including the header

			// will disable the next button since it's the last page
			expect(nextButtonElement).toHaveAttribute('disabled');

			// will display expected page info
			expect(screen.getByText('11–11 of 11')).toBeInTheDocument();
		});

		it('go back to previous page once previous button is clicked', () => {
			const previousButtonElement = screen.getByRole('button', { name: 'Go to previous page' });
			const nextButtonElement = screen.getByRole('button', { name: 'Go to next page' });

			userEvent.click(nextButtonElement);
			userEvent.click(previousButtonElement);

			expect(screen.getAllByRole('row')).toHaveLength(11); // 11 including the header

			// will disable the previous button since it's the first page
			expect(previousButtonElement).toHaveAttribute('disabled');

			// will display expected page info
			expect(screen.getByText('1–10 of 11')).toBeInTheDocument();
		});
	});
});
