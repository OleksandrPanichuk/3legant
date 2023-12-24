'use client'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui'
import type { CreateProductInput } from '@/services'
import {
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput as NumberInputWrapper,
	NumberInputField,
	NumberInputStepper
} from '@chakra-ui/number-input'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface INumberInputProps {
	name: keyof CreateProductInput
	label: string
	format: (val: string) => string
	parse: (val: string) => string
}

export const NumberInput = ({
	name,
	format,
	label,
	parse
}: INumberInputProps) => {
	const { control } = useFormContext<CreateProductInput>()
	const [value, setValue] = useState('0')

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<NumberInputWrapper
							{...field}
							onChange={(valueString, valueNumber) => {
								field.onChange(valueNumber)
								setValue(parse(valueString))
							}}
							value={format(value)}
							min={0}
						>
							<NumberInputField value={value} />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInputWrapper>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
