"use client"
import { useProductContext } from '@/components/screens/dashboard-product'
import {
	CreateProductColorInput,
	ProductsService,
	createProductColorSchema,
} from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useNewColorForm = () => {
	return useForm<Omit<CreateProductColorInput,'productId'>>({
		resolver: zodResolver(createProductColorSchema),
		defaultValues: {
			name: '',
			
		},
		mode: 'onBlur',
	})
}

export function useCreateProductColor() {
	const { setProduct, product } = useProductContext()
	return useMutation({
		mutationFn: (dto: Omit<CreateProductColorInput, 'productId'>) =>
			ProductsService.createColor({...dto,productId:product.id }),
		onSuccess: ({ data }) => {
			setProduct(prev => ({
				...prev,
				colors: prev.colors.concat([data]),
			}))
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Failed to add product color'
				)
			}
			return toast.error('Something went wrong')
		},
	})
}
