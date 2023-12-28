import { FindAllCategoriesResponse } from '@/services'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { create } from 'zustand'

type TypeRefetchCategoriesFunction = (
	options?: RefetchOptions | undefined
) => Promise<QueryObserverResult<FindAllCategoriesResponse, Error>>

interface IDashboardStore {
	refetchCategories?: TypeRefetchCategoriesFunction
	setRefetchCategories: (refetch: TypeRefetchCategoriesFunction) => void
}

export const useDashboardStore = create<IDashboardStore>(set => ({
	setRefetchCategories: refetchCategories => set({ refetchCategories }),
}))
