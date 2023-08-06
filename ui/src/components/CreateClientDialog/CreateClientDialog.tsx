import { FunctionComponent, useState, Dispatch, SetStateAction, useContext } from 'react';

import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	Stepper,
	Step,
	StepLabel,
	Stack,
	IconButton,
	Snackbar,
	Alert,
	CircularProgress,
} from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';

import { FirstStepFields } from './FirstStepFields';
import { SecondStepFields } from './SecondStepFIelds';
import { createClient } from '../../services/api';
import { StateContext } from '../../store/DataProvider';

// should be moved in types
export enum CreateCientFieldEnum {
	firstName = 'firstName',
	lastName = 'lastName',
	email = 'email',
	phoneNumber = 'phoneNumber',
}

// should be moved in constants
export const createClientFieldsInitialState = {
	[CreateCientFieldEnum.firstName]: '',
	[CreateCientFieldEnum.lastName]: '',
	[CreateCientFieldEnum.email]: '',
	[CreateCientFieldEnum.phoneNumber]: '',
};

// should be moved in styles
const dialogCloseButtonStyle = { float: 'right' };
const dialogStepperWrapperStyle = { margin: '2rem 0 3rem' };

const CreateClientDialog: FunctionComponent<{
	showClientForm: boolean;
	setShowClientForm: Dispatch<SetStateAction<boolean>>;
}> = ({ showClientForm, setShowClientForm }) => {
	const { dispatch } = useContext(StateContext);

	const [activeStep, setActiveStep] = useState(0);
	const [loading, setLoading] = useState(false);
	const [showErrorMessage, setShowErrorMessage] = useState(false);
	const [createClientFields, setCreateClientFields] = useState(createClientFieldsInitialState as IClient);

	const dialogFormSteps = ['Personal details', 'Contact details'];

	const handleBackButtonClick = () => setActiveStep(activeStep - 1);
	const handleNextButtonClick = () => {
		if (activeStep === 0 && createClientFields.firstName !== '' && createClientFields.lastName !== '') {
			setActiveStep(activeStep + 1);
		}
		if (
			activeStep === dialogFormSteps.length - 1 &&
			createClientFields.email !== '' &&
			createClientFields.phoneNumber !== ''
		) {
			setLoading(true);
			createClient(createClientFields)
				.then((data) => {
					setLoading(false);
					setActiveStep(0);
					setShowClientForm(false);
					setCreateClientFields(createClientFieldsInitialState as IClient);
					dispatch({ type: 'CREATE_NEW_CLIENT', data });
				})
				.catch(() => {
					setLoading(false);
					setShowErrorMessage(true);
				});
		}
	};
	const isInvalidField = (field: CreateCientFieldEnum) => createClientFields[field] === '';

	return (
		<Dialog disableRestoreFocus fullWidth open={showClientForm}>
			<DialogTitle>
				Create new client
				<IconButton onClick={() => setShowClientForm(false)} sx={dialogCloseButtonStyle}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Stepper activeStep={activeStep}>
					{dialogFormSteps.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				<Stack sx={dialogStepperWrapperStyle}>
					{activeStep === 0 ? (
						<FirstStepFields
							isInvalidField={isInvalidField}
							createClientFields={createClientFields}
							setCreateClientFields={setCreateClientFields}
						/>
					) : (
						<SecondStepFields
							isInvalidField={isInvalidField}
							createClientFields={createClientFields}
							setCreateClientFields={setCreateClientFields}
						/>
					)}
				</Stack>
				<Stack justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'} flexDirection='row'>
					{activeStep !== 0 && (
						<Button onClick={handleBackButtonClick}>
							<KeyboardBackspaceIcon />
							Back
						</Button>
					)}
					{loading && <CircularProgress />}
					<Button onClick={handleNextButtonClick} variant='contained'>
						{activeStep === dialogFormSteps?.length - 1 ? 'Create client' : 'Continue'}
					</Button>
				</Stack>
				<Snackbar
					open={showErrorMessage}
					autoHideDuration={6000}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				>
					<Alert onClose={() => setShowErrorMessage(false)} severity='error'>
						Fail to save the form! please try again later.
					</Alert>
				</Snackbar>
			</DialogContent>
		</Dialog>
	);
};

export default CreateClientDialog;
