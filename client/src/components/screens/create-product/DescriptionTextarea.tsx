import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui'

import { Textarea } from '@chakra-ui/textarea'
import { useFormContext } from 'react-hook-form'



export const DescriptionTextarea = () => {
	const {control} = useFormContext()
	return (
		<FormField
			control={control}
			name={'description'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Description</FormLabel>
					<FormControl>
						<Textarea maxHeight={'12.5rem'} {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
