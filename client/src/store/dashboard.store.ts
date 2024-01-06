import { FindAllCategoriesResponse, FindAllUsersResponse } from '@/services'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { create } from 'zustand'

type TypeRefetch<T> = (
	options?: RefetchOptions | undefined
) => Promise<QueryObserverResult<T, Error>>

type TypeRefetchCategories = TypeRefetch<FindAllCategoriesResponse>
type TypeRefetchUsers = TypeRefetch<FindAllUsersResponse>

interface IDashboardStore {
	refetchCategories?: TypeRefetchCategories
	setRefetchCategories: (refetch: TypeRefetchCategories) => void

	refetchUsers?: TypeRefetchUsers
	setRefetchUsers: (refetch: TypeRefetchUsers) => void
}

export const useDashboardStore = create<IDashboardStore>(set => ({
	setRefetchCategories: refetchCategories => set({ refetchCategories }),
	setRefetchUsers: refetchUsers => set({ refetchUsers }),
}))
