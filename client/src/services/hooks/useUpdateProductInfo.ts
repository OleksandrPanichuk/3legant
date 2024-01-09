import { ProductsService, UpdateProductInfoInput } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ZodError } from 'zod'

type InputType = UpdateProductInfoInput & {
	productId: string
}

export const useUpdateProductInfo = () => {
	return useMutation({
		mutationFn: ({ productId, ...dto }: InputType) =>
			ProductsService.updateInfo(dto, productId),
		onSuccess: () => {
			toast.success('Product info successfully updated.')
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Failed to update product info'
				)
			}
			if (error instanceof ZodError) {
				return toast.error(error.message)
			}
			return toast.error('Something went wrong')
		},
	})
}
