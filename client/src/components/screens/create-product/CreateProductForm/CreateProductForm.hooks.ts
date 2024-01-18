import { CreateProductInput, ProductsService } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

export const useCreateProduct = () => {
	return useMutation({
		mutationFn: (dto: CreateProductInput) => ProductsService.create(dto),
		onSuccess: () => {
			toast.success('Product successfully created.')
		},
		onError:(error )=> {
			if(error instanceof AxiosError) {
				return toast.error(error.response?.data.message ?? 'Failed to create product')
			}
			if(error instanceof ZodError) {
				return toast.error(error.message)
			}
			return toast.error("Something went wrong")
		}
	})
}
