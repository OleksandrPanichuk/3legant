import {
	CategoriesService,
	UpdateProductInput,
	updateProductSchema,
} from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useProductContext } from '@/components/screens/dashboard-product'
import { QueryBaseKeys } from '@/shared/constants'
import { useQuery } from '@tanstack/react-query'
import isEqual from 'lodash.isequal'
import { toast } from 'sonner'

import { ProductsService } from '@/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ZodError } from 'zod'

export const useUpdateProductForm = (finallyFn?: () => void) => {
	const { mutateAsync } = useUpdateProduct()
	const { product, setProduct } = useProductContext()

	const { data: categories } = useQuery({
		queryKey: [QueryBaseKeys.CATEGORIES],
		queryFn: () => CategoriesService.findAll(),
		select: response => response.data.categories,
	})

	const form = useForm<UpdateProductInput>({
		resolver: zodResolver(updateProductSchema),
		defaultValues: {
			categories: product.categories.map(({ id }) => id),
			description: product.description,
			measurements: product.measurements,
			price: parseFloat(product.price),
			title: product.title,
		},
	})

	const onSubmit = async (values: UpdateProductInput) => {
		try {
			const dataToUpdate: Partial<UpdateProductInput> = Object.entries(
				values
			).reduce(
				(updateObj, [key, value]) => {
					if (
						!isEqual(
							typeof value === 'number' ? String(value) : value,
							//@ts-ignore
							Array.isArray(product[key])
								? //@ts-ignore
									product[key].map(item => item.id)
								: //@ts-ignore
									product[key]
						)
					) {
						updateObj[key] = value
					}
					return updateObj
				},
				{} as Record<string, string | number | string[]>
			)

			if (!Object.keys(dataToUpdate).length) {
				return toast.info('Please, change any info to update the product ')
			}

			const { data } = await mutateAsync({
				...dataToUpdate,
				productId: product.id,
			})
			setProduct(prev => ({
				...prev,
				...data,
				categories:
					categories && values.categories
						? values.categories.map(value => {
								return categories.find(category => category.id === value)!
							})
						: prev.categories,
			}))

			form.reset({
				...data,
				price: parseFloat(data.price),
				categories: values.categories,
			})
		} catch {
			form.reset()
		} finally {
			finallyFn?.()
		}
	}

	return { ...form, onSubmit }
}

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
				predicate: query => query.queryKey.includes(QueryBaseKeys.PRODUCTS),
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
