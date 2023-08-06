import { FunctionComponent, Dispatch, SetStateAction } from 'react';

import { TextField, FormLabel, FormControl, FormHelperText, Stack } from '@mui/material';
import { CreateCientFieldEnum } from '../CreateClientDialog';

export const SecondStepFields: FunctionComponent<{
	isInvalidField: (field: CreateCientFieldEnum) => boolean;
	createClientFields: IClient;
	setCreateClientFields: Dispatch<SetStateAction<IClient>>;
}> = ({ isInvalidField, setCreateClientFields, createClientFields }) => {
	return (
		<Stack rowGap={3}>
			<FormControl error={isInvalidField(CreateCientFieldEnum.email)}>
				<FormLabel>Email</FormLabel>
				<TextField
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setCreateClientFields((state) => ({ ...state, email: event.target.value }))
					}
					value={createClientFields.email}
					error={isInvalidField(CreateCientFieldEnum.email)}
					autoFocus
				/>
				{isInvalidField(CreateCientFieldEnum.email) && (
					<FormHelperText error={isInvalidField(CreateCientFieldEnum.email)}>
						Email is required.
					</FormHelperText>
				)}
			</FormControl>
			<FormControl error={isInvalidField(CreateCientFieldEnum.phoneNumber)}>
				<FormLabel>Phone number</FormLabel>
				<TextField
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setCreateClientFields((state) => ({ ...state, phoneNumber: event.target.value }))
					}
					value={createClientFields.phoneNumber}
					error={isInvalidField(CreateCientFieldEnum.phoneNumber)}
				/>
				{isInvalidField(CreateCientFieldEnum.phoneNumber) && (
					<FormHelperText error={isInvalidField(CreateCientFieldEnum.phoneNumber)}>
						Phone number is required.
					</FormHelperText>
				)}
			</FormControl>
		</Stack>
	);
};
