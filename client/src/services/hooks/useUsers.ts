'use client'
import { FindAllUsersResponse, UsersService } from '@/services'
import { FetchMoreState } from '@/shared/types'
import {
	UseQueryResult,
	keepPreviousData,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useState } from 'react'

const TAKE_USERS = 10

type UseUsersResult = UseQueryResult<FindAllUsersResponse, Error> & {
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
		queryKey: ['users', page, take, searchValue],
		staleTime: 1000 * 60 * 30,
		queryFn: async () => {
			const response = await UsersService.findAll({
				searchValue,
				take,
				skip: page * take,
			})

			if (
				canFetchMore === 'can-fetch-one-more' ||
				response.data.users.length < take
			) {
				setCanFetchMore('cannot-fetch-more')
			}
			return response
		},
		select: response => response.data,
		retry: false,
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
		if (!isPlaceholderData && canFetchMore === 'can-fetch-more') {
			queryClient.prefetchQuery({
				queryKey: ['users', page + 1, searchValue],
				queryFn: async () => {
					const response = await UsersService.findAll({
						searchValue,
						take,
						skip: (page + 1) * take,
					})
					if (response.data.users.length === 0) {
						setCanFetchMore('cannot-fetch-more')
					} else if (response.data.users.length < take) {
						setCanFetchMore('can-fetch-one-more')
					}

					return response
				},
				staleTime: 1000 * 60 * 30,
			})
		}
	}, [isPlaceholderData, page, queryClient, searchValue, take, canFetchMore])

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
