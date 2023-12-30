'use client'

import { useDebounce } from '@/hooks'
import {
	FindAllProductsInput,
	UseProductsResult,
	useProducts,
} from '@/services'
import { ProductStatus } from '@/shared/types'
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react'

type TypeProductsContext = UseProductsResult & {
	category: string
	searchValue: string
	sortBy?: ProductsSortByState
	prices: FindAllProductsInput['prices']
	productStatus?: ProductStatus

	setProductStatus: Dispatch<SetStateAction<ProductStatus | undefined>>
	setCategory: Dispatch<SetStateAction<string>>
	setSortBy: Dispatch<SetStateAction<ProductsSortByState | undefined>>
	setSearchValue: Dispatch<SetStateAction<string>>
	setPrices: Dispatch<SetStateAction<FindAllProductsInput['prices']>>
}

type ProductsSortByState = {
	order: 'asc' | 'desc'
	name: 'title' | 'price' | 'createdAt'
}

export const ProductsContext = createContext<TypeProductsContext>(
	{} as TypeProductsContext
)

export const ProductsProvider = ({ children }: PropsWithChildren) => {
	const [category, setCategory] = useState<string>('')
	const [searchValue, setSearchValue] = useState<string>('')
	const [sortBy, setSortBy] = useState<ProductsSortByState>()
	const [prices, setPrices] = useState<FindAllProductsInput['prices']>()
	const [productStatus, setProductStatus] = useState<ProductStatus>()

	const debouncedSearchValue = useDebounce(searchValue)

	const queryState = useProducts({
		searchValue: debouncedSearchValue,
		category,
		sortBy: sortBy?.name,
		sortOrder: sortBy?.order,
		prices,
	})

	return (
		<ProductsContext.Provider
			value={{
				category,
				searchValue,
				sortBy,
				prices,
				productStatus,
				setProductStatus,
				setCategory,
				setSearchValue,
				setSortBy,
				setPrices,
				...queryState,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}

export const useProductsContext = () => useContext(ProductsContext)
