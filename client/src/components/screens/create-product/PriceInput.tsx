'use client'
import { FormNumberInput } from '@/components/ui'
import { CreateProductInput } from '@/services'
import { useFormContext } from 'react-hook-form'

export const PriceInput = ({ disabled }: { disabled?: boolean }) => {
	const { control } = useFormContext<CreateProductInput>()

	return (
		<FormNumberInput
			control={control}
			isDisabled={disabled}
			name={'price'}
			min={0}
			precision={2}
			fieldProps={{ placeholder: 'Enter the product price in $' }}
			label='Price'
		/>
	)
}
