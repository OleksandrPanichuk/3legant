import { ProductsService, UpdateProductInput } from '@/services'
import { QueryBaseKeys } from '@/shared/constants'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

type InputType = UpdateProductInput & {
	productId: string
}

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ productId, ...dto }: InputType) =>
			ProductsService.update(dto, productId),
		onSuccess: () => {
			queryClient.removeQueries({
				predicate: query => query.queryKey.includes(QueryBaseKeys.PRODUCTS)
			})

			toast.success('Product successfully updated.')
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Failed to update product'
				)
			}
			if (error instanceof ZodError) {
				return toast.error(error.message)
			}
			return toast.error('Something went wrong')
		},
	})
}
