"use client"
import { CategoriesService, CreateCategoryInput } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const useCreateCategory = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: (dto: CreateCategoryInput) => CategoriesService.create(dto),
		onSuccess:({data}) => {
			toast.success(`Category ${data.name} created`)
			router.refresh()
		},
		onError:(error) => {
			if(error instanceof AxiosError && error.response?.data.message) {
				return toast.error(error.response?.data.message)
			}
			if(error instanceof ZodError)  {
				return toast.error(error.message)
			}
			return toast.error('Failed to create new category')
		}
	})
}
