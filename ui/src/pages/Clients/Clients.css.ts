// clients
export const mainContainerStyle = { width: '44rem', maxWidth: '100%', marginTop: '1rem' };
export const mainContainerActionBarStyle = { padding: '1rem 0', justifyContent: 'space-between' };

// table
export const tableContainerStyle = { maxWidth: '100%', maxHeight: '65vh' };
export const tableStyle = { minWidth: 500, tableLayout: 'fixed' };
export const tableEmptyRowStyle = { padding: 3 };
export const tableRowStyle = {
	'&:last-child td, &:last-child th': { border: 0 },
	cursor: 'pointer',
	'&:hover': {
		backgroundColor: '#f5f5f5',
	},
};
export const tableCellInnerStyle = { overflow: 'hidden', textOverflow: 'ellipsis' };
