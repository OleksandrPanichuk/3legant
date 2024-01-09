'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui'
import { CategoriesService, CreateProductInput } from '@/services'
import { QueryBaseKeys } from '@/shared/constants'
import { Flex } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Loader2, XCircle } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import Select from 'react-select'

export const CategoriesSelect = ({ disabled }: { disabled?: boolean }) => {
	const { control } = useFormContext<CreateProductInput>()

	const { data, isFetching, isError } = useQuery({
		queryKey: [QueryBaseKeys.CATEGORIES],
		queryFn: () => CategoriesService.findAll(),
		select: response => response.data,
	})

	return (
		<FormField
			control={control}
			name={'categories'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Categories</FormLabel>
					<FormControl>
						<Select
							isMulti
							isDisabled={disabled}
							onChange={options =>
								field.onChange(options?.map(option => option.id))
							}
							options={
								isFetching
									? [
											{
												value: '',
												id: '',
												label: (
													<Flex alignItems={'center'} gap={'0.5rem'}>
														<Loader2 className='animate-spin' />
														Loading...
													</Flex>
												),
											},
										]
									: isError
										? [
												{
													value: '',
													id: '',
													label: (
														<Flex alignItems={'center'} gap={'0.5rem'}>
															<XCircle color='#ff5630' />
															Failed to get categories
														</Flex>
													),
												},
											]
										: data?.categories.map(category => ({
												label: <>{category.name}</>,
												value: category.name,
												id: category.id,
											}))
							}
							placeholder={'Select categories for product'}
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
