'use client'
import { CategoriesService, FindAllCategoriesResponse } from '@/services'
import { FetchMoreState } from '@/shared/types'
import {
	UseQueryResult,
	keepPreviousData,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

const TAKE_CATEGORIES = 10

type UseCategoriesResult = UseQueryResult<FindAllCategoriesResponse, Error> & {
	page: number
	maxPages: number
	fetchNextPage: () => void
	fetchPrevPage: () => void
	canFetchMore: FetchMoreState
	take: number
}

export const useCategories = (
	searchValue?: string,
	take: number = TAKE_CATEGORIES
): UseCategoriesResult => {
	const queryClient = useQueryClient()
	const [page, setPage] = useState<number>(0)
	const [canFetchMore, setCanFetchMore] =
		useState<FetchMoreState>('can-fetch-more')

	const { isPlaceholderData, ...queryState } = useQuery({
		queryKey: ['categories', page, take, searchValue],
		queryFn:  () => 
			 CategoriesService.findAll({
				searchValue,
				take,
				skip: take * page,
			})

		,
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
	}, [searchValue])

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
			!searchValue
		) {
			queryClient.prefetchQuery({
				queryKey: ['categories', page + 1, take, searchValue],
				queryFn: () =>
					CategoriesService.findAll({
						searchValue,
						take,
						skip: (page + 1) * take,
					}),
				staleTime: 1000 * 60 * 30,
			})
		}
	}, [
		isPlaceholderData,
		page,
		queryClient,
		searchValue,
		take,	canFetchMore,
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
