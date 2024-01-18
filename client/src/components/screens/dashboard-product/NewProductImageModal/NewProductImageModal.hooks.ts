'use client'
import { useProductContext } from '@/components/screens/dashboard-product'
import { AddProductImageInput, ProductsService } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useAddProductImage = () => {
	const { product, setProduct } = useProductContext()
	return useMutation({
		mutationFn: (dto: AddProductImageInput) =>
			ProductsService.addImage(dto, product.id),
		onSuccess: ({ data }) => {
			setProduct(prev => ({
				...prev,
				images: data.isPreview
					? prev.images
							.map(image => ({ ...image, isPreview: false }))
							.concat([data])
					: prev.images.concat([data]),
			}))
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Failed to add product image'
				)
			}
			return toast.error('Something went wrong')
		},
	})
}
