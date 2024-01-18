'use client'
import { useProductContext } from '@/components/screens/dashboard-product'
import { DeleteProductImageInput, ProductsService, UpdateProductImageStatusInput } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

export const useDeleteProductImage = () => {
	const { setProduct } = useProductContext()

	return useMutation({
		mutationFn: (dto: DeleteProductImageInput) =>
			ProductsService.deleteImage(dto),
		onSuccess: (_, input) => {
			setProduct(prev => ({
				...prev,
				images: prev.images.filter(img => img.id !== input.imageId),
			}))


			toast.success('Deleted')
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Failed to delete product image'
				)
			}
			return toast.error('Something went wrong')
		},
	})
}


export const useUpdateProductImageStatus = () => {
	const {setProduct} = useProductContext()

	return useMutation({
		mutationFn: (dto: UpdateProductImageStatusInput) => ProductsService.updateImageStatus(dto),
		onSuccess: ({data}) => {
			setProduct(prev => ({
				...prev,
				images: prev.images.map(item => {
					if(item.id === data.id) {
						return data
					}

					if(item.isPreview && item.id !== data.id) {
						return {...item, isPreview:false}
					}

					return item
				})
			}))
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Failed to delete product image'
				)
			}
			return toast.error('Something went wrong')
		},
	})
}