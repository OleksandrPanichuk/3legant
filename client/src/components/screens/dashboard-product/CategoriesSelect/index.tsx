'use client'

import { useProductContext } from '@/components/screens/dashboard-product'
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

import { cn } from '@/lib'
import styles from './CategoriesSelect.module.scss'

interface ICategoriesSelectProps {
	disabled?: boolean
}

export const CategoriesSelect = ({ disabled }: ICategoriesSelectProps) => {
	const { control } = useFormContext<CreateProductInput>()
	const { product } = useProductContext()

	const { data, isFetching, isError } = useQuery({
		queryKey: [QueryBaseKeys.CATEGORIES],
		queryFn: () => CategoriesService.findAll(),
		select: response => response.data,
	})

	const getOptions = ():
		| {
				label: React.JSX.Element
				value: string
				id: string
		  }[]
		| undefined => {
		if (isFetching) {
			return [
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
		}
		if (isError) {
			return [
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
		}
		return data?.categories.map(category => ({
			label: <>{category.name}</>,
			value: category.name,
			id: category.id,
		}))
	}

	return (
		<FormField
			control={control}
			name={'categories'}
			render={({ field }) => (
				<FormItem>
					<FormLabel>Categories</FormLabel>
					<FormControl>
						{/* TODO: Select value tracking */}
						<Select
							onChange={options =>
								field.onChange(options?.map(option => option.id))
							}
							defaultValue={product.categories.map(category => ({
								label: <>{category.name}</>,
								value: category.name,
								id: category.id,
							}))}
							classNames={{
								control: props =>
									cn(
										styles.control,
										props.isDisabled && styles['control--disabled'],
										props.isFocused && styles['control--focused']
									),
								menuList: () => cn(styles['menu-list'], 'scrollbar'),
								option: props =>
									cn(
										!isFetching && !isError && styles.option,
										isFetching && styles['option-fetching'],
										isError && styles['option-error'],
										props.isFocused && styles['option--focused']
									),
							}}
							placeholder={'Select categories for product'}
							options={getOptions()}
							isDisabled={disabled}
							isMulti
						/>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
