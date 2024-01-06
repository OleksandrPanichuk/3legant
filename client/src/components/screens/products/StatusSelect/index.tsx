'use client'
import { useProductsContext } from '@/components/screens/products'
import { productStatusMap } from '@/shared/constants'
import { ProductStatus } from '@/shared/types'
import { Badge, useDisclosure } from '@chakra-ui/react'
import Select, { SingleValue } from 'react-select'

import { cn } from '@/lib'
import { ChevronDown } from 'lucide-react'
import styles from './StatusSelect.module.scss'

type TypeValue = ProductStatus | 'ANY'

type TypeSelectOption = {
	label: React.JSX.Element
	value: TypeValue
}

const options: TypeSelectOption[] = [
	{
		value: 'ANY' as TypeValue,
		label: (
			<Badge className={styles.label} colorScheme={'telegram'}>
				Any Status
			</Badge>
		),
	},
].concat(
	Object.entries(productStatusMap).map(([key, value]) => ({
		value: key as TypeValue,
		label: (
			<Badge className={styles.label} colorScheme={value.colorScheme}>
				{value.text}
			</Badge>
		),
	}))
)

export const StatusSelect = () => {
	const { setProductStatus, productStatus } = useProductsContext()
	const { isOpen, onOpen, onClose } = useDisclosure()

	const onChange = (option: SingleValue<TypeSelectOption>) => {
		const value = option?.value
		setProductStatus(value === 'ANY' ? undefined : value)
	}

	return (
		<Select
			value={options.find(option => option.value === (productStatus ?? 'ANY'))}
			options={options}
			classNames={{
				indicatorSeparator: () => 'hidden',
				control: () => styles.control,
				option: props =>
					cn(
						styles.option,
						props.isSelected && styles['option--selected'],
						props.isFocused && styles['option--focused']
					),
				menu: () => styles.menu,
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
			onMenuOpen={onOpen}
			onMenuClose={onClose}
			onChange={onChange}
			isSearchable={false}
		/>
	)
}
