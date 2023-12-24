import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui'
import { Textarea } from '@chakra-ui/textarea'
import { useFormContext } from 'react-hook-form'

export const DetailsTextarea = () => {
	const { control } = useFormContext()
	return (
		<FormField
			control={control}
			name={'details'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Product details</FormLabel>
					<FormControl>
						<Textarea maxHeight={'12.5rem'} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
