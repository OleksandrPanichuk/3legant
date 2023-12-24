'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/components/ui'
import { CreateProductInput } from '@/services'
import { useFormContext } from 'react-hook-form'

export const WeightInput = () => {
	const { control } = useFormContext<CreateProductInput>()

	return (
		<FormField
			control={control}
			name={'weight'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Weight</FormLabel>
					<FormControl>
						<Input {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
