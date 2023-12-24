import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui'
import { Input } from '@chakra-ui/input'
import { useFormContext } from 'react-hook-form'


export const MeasurementInput = () => {
	const {control} = useFormContext()
	return (
		<FormField
			control={control}
			name={'measurements'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Measurements</FormLabel>
					<FormControl>
						<Input {...field} placeholder='17 1/2x20 5/8 "' />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
