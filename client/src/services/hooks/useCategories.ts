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
	withPrefetch: boolean = true,
	take: number = TAKE_CATEGORIES
): UseCategoriesResult => {
	const queryClient = useQueryClient()
	const [page, setPage] = useState<number>(0)
	const [canFetchMore, setCanFetchMore] =
		useState<FetchMoreState>('can-fetch-more')

	const { isPlaceholderData, ...queryState } = useQuery({
		queryKey: ['categories', page, take, searchValue],
		queryFn: async () => {
			const response = await CategoriesService.findAll({
				searchValue,
				take,
				skip: take * page,
			})
			if (
				canFetchMore === 'can-fetch-one-more' ||
				response.data.categories.length < take
			) {
				setCanFetchMore('cannot-fetch-more')
			}

			return response
		},
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 30,
		retry: false,
		select: response => response.data,
		enabled: canFetchMore !== 'cannot-fetch-more',
	})

	const fetchNextPage = useCallback(() => {
		setPage(prev => prev + 1)
	}, [])
	const fetchPrevPage = useCallback(() => {
		if (page > 0) {
			setCanFetchMore('can-fetch-more')
		}
		setPage(prev => (prev > 0 ? prev - 1 : prev))
	}, [page])

	const maxPages = useMemo(() => {
		if (!queryState.data?.count) return 1

		return Math.ceil(queryState.data.count / take)
	}, [queryState.data?.count, take])

	useEffect(() => {
		setPage(0)
		setCanFetchMore('can-fetch-more')
	}, [searchValue])

	useEffect(() => {
		if (!queryState.data) {
			return
		}
		if (queryState.data.count <= (page + 1) * take) {
			setCanFetchMore('cannot-fetch-more')
		}
	}, [queryState.data, page, take])

	useEffect(() => {
		if (
			!isPlaceholderData &&
			withPrefetch &&
			canFetchMore === 'can-fetch-more'
		) {
			queryClient.prefetchQuery({
				queryKey: ['users', page + 1, searchValue],
				queryFn: async () => {
					const response = await CategoriesService.findAll({
						searchValue,
						take,
						skip: (page + 1) * take,
					})
					if (response.data.categories.length === 0) {
						setCanFetchMore('cannot-fetch-more')
					} else if (response.data.categories.length < take) {
						setCanFetchMore('can-fetch-one-more')
					}

					return response
				},
				staleTime: 1000 * 60 * 30,
			})
		}
	}, [
		isPlaceholderData,
		page,
		queryClient,
		searchValue,
		take,
		withPrefetch,
		canFetchMore,
	])

	return {
		...queryState,
		isPlaceholderData,
		canFetchMore,
		page,
		fetchNextPage,
		fetchPrevPage,
		maxPages,
		take
	}
}
