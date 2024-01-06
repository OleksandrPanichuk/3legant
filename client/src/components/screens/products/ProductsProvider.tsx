'use client'

import { SortByState, productsSortByNames } from '@/components/common'
import { useDebounce } from '@/hooks'
import { TypeProductPrice, UseProductsResult, useProducts } from '@/services'
import { ProductStatuses, sortOrders } from '@/shared/constants'
import { ProductStatus } from '@/shared/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

type TypeProductsContext = UseProductsResult & {
	category: string
	searchValue: string
	sortBy: SortByState | undefined
	prices: TypeProductPrice[] | undefined
	productStatus: ProductStatus | undefined

	setSearchValue: Dispatch<SetStateAction<string>>
	setCategory: Dispatch<SetStateAction<string>>
	setPrices: Dispatch<SetStateAction<TypeProductPrice[] | undefined>>
	setProductStatus: Dispatch<SetStateAction<ProductStatus | undefined>>
	setSortBy: Dispatch<SetStateAction<SortByState | undefined>>
}

export const ProductsContext = createContext<TypeProductsContext>(
	{} as TypeProductsContext
)

export const ProductsProvider = ({ children }: PropsWithChildren) => {
	const searchParams = useSearchParams()
	const router = useRouter()
	const pathname = usePathname()

	const getPricesFromSearchParams = (): TypeProductPrice[] | undefined => {
		const valueFromSearchParam = searchParams.get('prices')
		const param = valueFromSearchParam ? JSON.parse(valueFromSearchParam) : ''

		if (!Array.isArray(param)) {
			return
		}

		if (
			!param.every(
				(price: Record<string, number>) =>
					('start' in price || 'end' in price) &&
					(typeof price.start === 'number' || typeof price.end === 'number')
			)
		) {
			return
		}
		return param as TypeProductPrice[]
	}

	const getSortByState = ():SortByState | undefined => {
		let sortOrder = searchParams.get('sortOrder') as SortByState['order'] | null
		if(!sortOrder || !sortOrders.includes(sortOrder)) {
			sortOrder = 'asc'
		}

		let sortBy = searchParams.get('sortBy')  as SortByState['name'] | null
		if(sortBy && !productsSortByNames.includes(sortBy)) {
			sortBy = null
		}
		return sortBy && sortOrder ?  {name:sortBy, order:sortOrder} : undefined
}
	const [category, setCategory] = useState<string>(
		searchParams.get('category') ?? ''
	)
	const [searchValue, setSearchValue] = useState<string>(
		searchParams.get('q') ?? ''
	)
	const [sortBy, setSortBy] = useState<SortByState | undefined>(getSortByState())
	const [prices, setPrices] = useState<TypeProductPrice[] | undefined>(
		getPricesFromSearchParams()
	)
	const [productStatus, setProductStatus] = useState<ProductStatus | undefined>(
		ProductStatuses.find(v => v === searchParams.get('status'))
	)

	const debouncedSearchValue = useDebounce(searchValue)

	const queryState = useProducts({
		searchValue: debouncedSearchValue,
		category,
		sortBy: sortBy?.name,
		sortOrder: sortBy?.order,
		prices,
		status: productStatus,
	})

	useEffect(() => {
		const updatedParams: Record<string, string> = {}

		if (category) {
			updatedParams.category = category
		}

		if (prices?.length) {
			updatedParams.prices = JSON.stringify(prices)
		}

		if (productStatus) {
			updatedParams.status = productStatus
		}

		if (debouncedSearchValue) {
			updatedParams.q = debouncedSearchValue
		}

		if(sortBy) {
			updatedParams.sortBy = sortBy.name
			updatedParams.sortOrder = sortBy.order
		}

		const url = qs.stringifyUrl({
			url: pathname,
			query: updatedParams,
		})

		router.push(url)
	}, [category, productStatus, router, prices, debouncedSearchValue, sortBy])

	return (
		<ProductsContext.Provider
			value={{
				category,
				searchValue,
				sortBy,
				prices,
				productStatus,
				setProductStatus,
				setPrices,
				setCategory,
				setSearchValue,
				setSortBy,
				...queryState,
			}}
		>
			{children}
		</ProductsContext.Provider>
	)
}

export const useProductsContext = () => useContext(ProductsContext)
