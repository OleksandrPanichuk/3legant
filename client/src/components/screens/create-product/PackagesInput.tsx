import { FormNumberInput } from '@/components/ui'
import { CreateProductInput } from '@/services'
import { useFormContext } from 'react-hook-form'

export const PackagesInput = ({ disabled }: { disabled?: boolean }) => {
	const { control } = useFormContext<CreateProductInput>()

	return (
		<FormNumberInput
			control={control}
			min={0}
			isDisabled={disabled}
			name='packages'
			label={'Packages'}
		/>
	)
	// return (
	// 	<FormField
	// 		control={control}
	// 		name='packages'
	// 		render={({ field }) => (
	// 			<FormItem>
	// 				<FormLabel>Packages</FormLabel>
	// 				<FormControl>
	// 					<NumberInput
	// 						{...field}
	// 						isDisabled={disabled}
	// 						onChange={(_, valueNumber) =>
	// 							field.onChange(Number.isNaN(valueNumber) ? 0 : valueNumber)
	// 						}
	// 						min={0}
	// 					>
	// 						<NumberInputField />
	// 						<NumberInputStepper>
	// 							<NumberIncrementStepper />
	// 							<NumberDecrementStepper />
	// 						</NumberInputStepper>
	// 					</NumberInput>
	// 				</FormControl>
	// 				<FormMessage />
	// 			</FormItem>
	// 		)}
	// 	/>
	// )
}
