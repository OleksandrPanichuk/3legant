'use client'
import { CategoriesService, CreateCategoryInput } from '@/services'
import { useDashboardStore } from '@/store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'
import {TypeCategory} from '@/shared/types'

export const useCreateCategory = ({onSuccess}:{onSuccess?:(data:TypeCategory)=> void | Promise<void>} ={}) => {
	const queryClient = useQueryClient()
	const refetchCategories = useDashboardStore(state => state.refetchCategories)
	return useMutation({
		mutationFn: (dto: CreateCategoryInput) => CategoriesService.create(dto),
		onSuccess: ({ data }) => {
			toast.success(`Category ${data.name} created`)
			queryClient.removeQueries({
				predicate: query => query.queryKey.includes('categories'),
			})
			refetchCategories?.()
			onSuccess?.(data)
		},
		onError: error => {
			if (error instanceof AxiosError && error.response?.data.message) {
				return toast.error(error.response?.data.message)
			}
			if (error instanceof ZodError) {
				return toast.error(error.message)
			}
			return toast.error('Failed to create new category')
		},
	})
}
