'use client'
import { CategoriesService } from '@/services'
import { useDashboardStore } from '@/store'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()
	const refetchCategories = useDashboardStore(state => state.refetchCategories)
	return useMutation({
		mutationFn: (id: string) => CategoriesService.delete(id),
		onSuccess: async ({ data }) => {
			toast.success(data)
			queryClient.removeQueries({
				predicate: query => query.queryKey.includes('categories'),
			})

			refetchCategories?.()
		},
		onError: error => {
			if (error instanceof AxiosError && error.response?.data.message) {
				return toast.error(error.response?.data.message)
			}
			if (error instanceof ZodError) {
				return toast.error(error.message)
			}
			return toast.error('Failed to delete category')
		},
	})
}
