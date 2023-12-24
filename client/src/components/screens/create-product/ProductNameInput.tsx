import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui'
import { Input } from '@chakra-ui/input'
import { useFormContext } from 'react-hook-form'



export const ProductNameInput = () => {
	const {control} = useFormContext()
	return (
		<FormField
			control={control}
			name={'title'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Name</FormLabel>
					<FormControl>
						<Input {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
