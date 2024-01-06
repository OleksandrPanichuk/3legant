'use client'

import { CategoriesService } from '@/services'
import { QueryBaseKeys } from '@/shared/constants'
import { Flex, Skeleton, useDisclosure } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, ChevronDown } from 'lucide-react'
import { Dispatch, SetStateAction, memo, useMemo } from 'react'
import Select from 'react-select'

import { cn } from '@/lib'
import styles from './CategorySelect.module.scss'

interface ICategorySelectProps {
	value: string
	setValue: Dispatch<SetStateAction<string>>
}

const SKELETON_COUNT = 6

const errorOption = {
	label: (
		<Flex className={styles.error}>
			<AlertCircle color='red' /> Failed to get categories
		</Flex>
	),
	value: 'Something went wrong',
	category: '',
}

export const CategorySelect = memo(
	({ setValue, value }: ICategorySelectProps) => {
		const { isOpen, onClose, onOpen } = useDisclosure()

		const { data, isFetching, isError } = useQuery({
			queryKey: [QueryBaseKeys.CATEGORIES],
			queryFn: () => CategoriesService.findAll(),
			retry: false,
			select: response => response.data,
			enabled: isOpen,
		})

		const chosenOption = useMemo(() => {
			return isError
				? errorOption
				: {
						label: <>{value || 'All Rooms'}</>,
						value: value || 'All Rooms',
						category: '',
					}
		}, [isError, value])

		const getOptions = (): {
			label: React.JSX.Element
			value: string
			category: string
		}[] => {
			if (isFetching) {
				return Array(SKELETON_COUNT)
					.fill(0)
					.map((_, i) => ({
						label: <Skeleton className={styles.skeleton} key={i} />,
						value: '',
						category: '',
					}))
			}

			if (isError) {
				return [errorOption]
			}

			return [
				{ value: 'All Rooms', label: <>All Rooms</>, category: '' },
			].concat(
				data?.categories.map(category => ({
					label: <>{category.name}</>,
					value: category.name,
					category: category.name,
				})) ?? []
			)
		}


		return (
			<Select
				isDisabled={isError}
				placeholder={'Choose any category...'}
				classNames={{
					indicatorSeparator: () => 'hidden',
					control: () => styles.control,
					option: props =>
						cn(
							!isFetching && !isError && styles.option,
							isFetching && styles['option-fetching'],
							isError && styles['option-error'],
							props.isSelected && styles['option--selected'],
							props.isFocused && styles['option--focused']
						),
					menu: () => styles.menu,
					menuList: () => cn(styles['menu-list'], 'scrollbar'),
				}}
				components={{
					IndicatorsContainer: () => (
						<div
							className={cn(
								styles.indicator,
								isOpen && styles['indicator--open']
							)}
						>
							<ChevronDown />
						</div>
					),
				}}
				options={getOptions()}
				value={chosenOption}
				onChange={option => setValue((option as any)?.category ?? '')}
				onMenuClose={onClose}
				onMenuOpen={onOpen}
			/>
		)
	}
)

CategorySelect.displayName = 'CategorySelect'
