'use client'
import { FindAllUsersResponse, UsersService } from '@/services'
import { QueryBaseKeys } from '@/shared/constants'
import { FetchMoreState } from '@/shared/types'
import {
	UseQueryResult,
	keepPreviousData,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

const TAKE_USERS = 10

export type UseUsersResult = UseQueryResult<FindAllUsersResponse, Error> & {
	page: number
	maxPages: number
	fetchNextPage: () => void
	fetchPrevPage: () => void
	canFetchMore: FetchMoreState
}

export const useUsers = (
	searchValue?: string,
	take: number = TAKE_USERS
): UseUsersResult => {
	const queryClient = useQueryClient()
	const [page, setPage] = useState<number>(0)
	const [canFetchMore, setCanFetchMore] =
		useState<FetchMoreState>('can-fetch-more')

	const { isPlaceholderData, ...queryState } = useQuery({
		placeholderData: keepPreviousData,
		queryKey: [QueryBaseKeys.USERS, page, take, searchValue],
		staleTime: 1000 * 60 * 30,
		queryFn: () =>
			UsersService.findAll({
				take,
				skip: page * take,
				searchValue,
			}),

		select: response => response.data,
		retry: false,
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
				queryKey: [QueryBaseKeys.USERS, page + 1, take, searchValue],
				queryFn: () =>
					UsersService.findAll({
						take,
						skip: (page + 1) * take,
						searchValue,
					}),
				retry: false,
				staleTime: 1000 * 60 * 30,
			})
		}
	}, [isPlaceholderData, page, queryClient, take, canFetchMore, searchValue])

	return {
		...queryState,
		maxPages,
		isPlaceholderData,
		page,
		fetchNextPage,
		fetchPrevPage,
		canFetchMore,
	}
}
