'use client'
import {
	FindAllProductsInput,
	FindAllProductsResponse,
	ProductsService,
} from '@/services'
import { QueryBaseKeys } from '@/shared/constants'
import { FetchMoreState } from '@/shared/types'
import {
	UseQueryResult,
	keepPreviousData,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

const TAKE_PRODUCTS = 12

export type UseProductsResult = UseQueryResult<FindAllProductsResponse, Error> & {
	page: number
	maxPages: number
	fetchNextPage: () => void
	fetchPrevPage: () => void
	canFetchMore: FetchMoreState
	take: number
}

interface UseProductsInput
	extends Omit<FindAllProductsInput, 'take' | 'skip'> {}

export const useProducts = (
	input?: UseProductsInput,
	isDashboard: boolean = false,
	take: number = TAKE_PRODUCTS
): UseProductsResult => {
	const queryClient = useQueryClient()
	const [page, setPage] = useState<number>(0)
	const [canFetchMore, setCanFetchMore] =
		useState<FetchMoreState>('can-fetch-more')

	const queryBaseKey = useMemo(() => {
		return isDashboard
			? QueryBaseKeys.DASHBOARD_PRODUCTS
			: QueryBaseKeys.PRODUCTS
	}, [isDashboard])

	const { isPlaceholderData, ...queryState } = useQuery({
		queryKey: [queryBaseKey, page, take, input],
		queryFn: () =>
			ProductsService.findAll({ take, skip: page * take, ...input }),

		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 30,
		retry: false,
		select: response => response.data,
		enabled: canFetchMore !== 'cannot-fetch-more',
	})

	const maxPages = useMemo(() => {
		if (!queryState.data?.count) return 1

		return Math.ceil(queryState.data.count / take)
	}, [queryState.data?.count, take])

	const fetchNextPage = useCallback(() => {
		setPage(prev => {
			if (prev + 2 <= maxPages) {
				return prev + 1
			}

			return prev
		})
	}, [maxPages])

	const fetchPrevPage = useCallback(() => {
		if (page > 0) {
			setCanFetchMore('can-fetch-more')
		}
		setPage(prev => (prev > 0 ? prev - 1 : prev))
	}, [page])

	useEffect(() => {
		setPage(0)
		setCanFetchMore('can-fetch-more')
	}, [input])

	useEffect(() => {
		if (page + 2 > maxPages) {
			setCanFetchMore('cannot-fetch-more')
		} else if (canFetchMore !== 'can-fetch-more') {
			setCanFetchMore('can-fetch-more')
		}
	}, [page, maxPages, canFetchMore])

	useEffect(() => {
		if (
			!isPlaceholderData &&
			canFetchMore === 'can-fetch-more' &&
			!input?.searchValue
		) {
			queryClient.prefetchQuery({
				queryKey: [queryBaseKey, page + 1, take, input],
				queryFn: () =>
					ProductsService.findAll({
						take,
						skip: (page + 1) * take,
						...input,
					}),
				staleTime: 1000 * 60 * 30,
			})
		}
	}, [
		isPlaceholderData,
		page,
		queryClient,
		input,
		take,
		canFetchMore,
		queryBaseKey,
	])

	return {
		...queryState,
		isPlaceholderData,
		canFetchMore,
		page,
		fetchNextPage,
		fetchPrevPage,
		maxPages,
		take,
	}
}
