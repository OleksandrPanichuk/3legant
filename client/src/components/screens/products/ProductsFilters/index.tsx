'use client'

import { CategorySelect, PricePicker, SortBySelect } from '@/components/common'
import {
	SearchBar,
	StatusSelect,
	useProductsContext,
} from '@/components/screens/products'
import { Flex } from '@chakra-ui/react'
import styles from './ProductsFilters.module.scss'

export const ProductsFilters = () => {
	const { prices, setPrices, category, setCategory, sortBy, setSortBy } =
		useProductsContext()

	return (
		<Flex className={styles.wrapper}>
			<SearchBar />
			<PricePicker value={prices} setValue={setPrices} />
			<StatusSelect />
			<CategorySelect value={category} setValue={setCategory} />

			<SortBySelect value={sortBy} setValue={setSortBy} />
		</Flex>
	)
}
