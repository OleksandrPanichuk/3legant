'use client'

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Select
} from '@/components/ui'
import { CategoriesService, CreateProductInput } from '@/services'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Flex } from '@chakra-ui/react'
import { Loader2 } from 'lucide-react'
import { MultiValue } from 'react-select'

type TypeSelectOption = {
	label: JSX.Element
	value: string
	id: string
}


export const CategoriesSelect = () => {
	const { control } = useFormContext<CreateProductInput>()

	const { data, isPending } = useQuery({
		queryKey: ['categories'],
		queryFn: () => CategoriesService.findAll(),
		select: (response) => response.data
	})

	return (
		<FormField
			control={control}
			name={'categories'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Categories</FormLabel>
					<FormControl>
						<Select<TypeSelectOption>
							isMulti
							onChange={(options) =>
								field.onChange(
									(options as unknown as MultiValue<TypeSelectOption>)?.map(
										(option) => option.id
									)
								)
							}
							options={
								isPending
									? [
											{
												value: '',
												id: '',
												label: (
													<Flex alignItems={'center'} gap={'0.5rem'}>
														<Loader2 className="animate-spin" />
														Loading...
													</Flex>
												)
											}
									  ]
									: data?.categories.map((category) => ({
											label: <>{category.name}</>,
											value: category.name,
											id: category.id
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
