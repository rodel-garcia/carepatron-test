import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	it('display the create new client button', () => {
		render(<App />);
		expect(screen.getByText('Create new client')).toBeInTheDocument();
	});

	it('display the client search field', () => {
		render(<App />);
		expect(screen.getByPlaceholderText('Search clients...')).toBeInTheDocument();
	});

	it('display the client list table', () => {
		render(<App />);
		expect(screen.getByRole('table')).toBeInTheDocument();
	});
});
