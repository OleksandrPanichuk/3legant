import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui'
import { CreateProductInput } from '@/services'
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const PackagesInput = ({ disabled }: { disabled?: boolean }) => {
	const { control } = useFormContext<CreateProductInput>()
	return (
		<FormField
			control={control}
			name='packages'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Packages</FormLabel>
					<FormControl>
						<NumberInput
							{...field}
							isDisabled={disabled}
							onChange={(_, valueNumber) => field.onChange(valueNumber)}
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
