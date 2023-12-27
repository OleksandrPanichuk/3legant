'use client'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui'
import { CreateProductInput } from '@/services'
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
} from '@chakra-ui/react'
import { useFormContext } from 'react-hook-form'

export const PriceInput = ({ disabled }: { disabled?: boolean }) => {
	const { control } = useFormContext<CreateProductInput>()

	return (
		<FormField
			control={control}
			name={'price'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Price</FormLabel>
					<FormControl>
						<NumberInput
							{...field}
							isDisabled={disabled}
							onChange={(_, valueNumber) => {
								field.onChange(valueNumber)
							}}
							precision={2}
							min={0}
						>
							<NumberInputField
								placeholder={'Enter the product in $'}
								value={field.value}
							/>
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
