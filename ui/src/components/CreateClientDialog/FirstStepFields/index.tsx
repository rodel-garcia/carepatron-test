import { FunctionComponent, Dispatch, SetStateAction } from 'react';

import { TextField, FormLabel, FormControl, FormHelperText, Stack } from '@mui/material';
import { CreateCientFieldEnum } from '../CreateClientDialog';

export const FirstStepFields: FunctionComponent<{
	isInvalidField: (field: CreateCientFieldEnum) => boolean;
	createClientFields: IClient;
	setCreateClientFields: Dispatch<SetStateAction<IClient>>;
}> = ({ isInvalidField, setCreateClientFields, createClientFields }) => {
	return (
		<Stack rowGap={3}>
			<FormControl error={isInvalidField(CreateCientFieldEnum.firstName)}>
				<FormLabel>First name</FormLabel>
				<TextField
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setCreateClientFields((state) => ({ ...state, firstName: event.target.value }))
					}
					value={createClientFields.firstName}
					error={isInvalidField(CreateCientFieldEnum.firstName)}
					autoFocus
				/>
				{isInvalidField(CreateCientFieldEnum.firstName) && (
					<FormHelperText error={isInvalidField(CreateCientFieldEnum.firstName)}>
						First name is required.
					</FormHelperText>
				)}
			</FormControl>
			<FormControl error={isInvalidField(CreateCientFieldEnum.lastName)}>
				<FormLabel>Last name</FormLabel>
				<TextField
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setCreateClientFields((state) => ({ ...state, lastName: event.target.value }))
					}
					value={createClientFields.lastName}
					error={isInvalidField(CreateCientFieldEnum.lastName)}
				/>
				{isInvalidField(CreateCientFieldEnum.lastName) && (
					<FormHelperText error={isInvalidField(CreateCientFieldEnum.lastName)}>
						Last name is required.
					</FormHelperText>
				)}
			</FormControl>
		</Stack>
	);
};
