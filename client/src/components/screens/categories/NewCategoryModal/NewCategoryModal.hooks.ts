'use client'
import { CategoriesService, CreateCategoryInput } from '@/services'
import { QueryBaseKeys } from '@/shared/constants'
import { TypeCategory } from '@/shared/types'
import { useDashboardStore } from '@/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const useCreateCategory = ({
	onSuccess,
}: { onSuccess?: (data: TypeCategory) => void | Promise<void> } = {}) => {
	const queryClient = useQueryClient()
	const refetchCategories = useDashboardStore(state => state.refetchCategories)
	return useMutation({
		mutationFn: (dto: CreateCategoryInput) => CategoriesService.create(dto),
		onSuccess: ({ data }) => {
			toast.success(`Category ${data.name} created`)
			queryClient.removeQueries({
				predicate: query => query.queryKey.includes(QueryBaseKeys.CATEGORIES),
			})
			refetchCategories?.()
			onSuccess?.(data)
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Failed to create new category'
				)
			}
			if (error instanceof ZodError) {
				return toast.error(error.message)
			}
			return toast.error('Something went wrong')
		},
	})
}
