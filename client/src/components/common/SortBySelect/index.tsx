import { cn } from '@/lib'
import { useDisclosure } from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react'
import Select from 'react-select'
import { options, productsSortByNames } from './SortBySelect.data'
import type { ISortBySelectProps, SortByState } from './SortBySelect.types'

import styles from './SortBySelect.module.scss'
import { memo } from 'react'

const SortBySelect = memo(({ setValue, value }: ISortBySelectProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	return (
		<Select
			onChange={option =>
				setValue(
					option ? { name: option.sortBy, order: option.sortOrder } : undefined
				)
			}
			value={options.find(
				option =>
					option.sortBy === value?.name && option.sortOrder === value.order
			)}
			classNames={{
				indicatorSeparator: () => 'hidden',
				control: () => styles.control,
				singleValue:() => styles.value,
				placeholder:() => styles.placeholder,
				clearIndicator:() => styles['clear-indicator'],
				valueContainer:() => styles.container,
				option: props =>
					cn(
						styles.option,
						props.isSelected && styles['option--selected'],
						props.isFocused && styles['option--focused']
					),
				
				menu: () => styles.menu,
				menuList: () => cn(styles['menu-list'], 'scrollbar'),
			}}
			components={{
				DropdownIndicator: () => (
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
			placeholder='Sort By'
			options={options}
			onMenuClose={onClose}
			onMenuOpen={onOpen}
			isSearchable={false}
			isClearable
		/>
	)
})

SortBySelect.displayName = 'SortBySelect'

export { SortBySelect, SortByState, productsSortByNames }
