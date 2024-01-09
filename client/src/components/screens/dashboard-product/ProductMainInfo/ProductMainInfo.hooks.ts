import {
	UpdateProductInput,
	updateProductSchema,
	useUpdateProduct,
} from '@/services'
import { TypeCategory, TypeProduct } from '@/shared/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useProductContext } from '@/components/screens/dashboard-product'
import isEqual from 'lodash.isequal'
import { toast } from 'sonner'

export const useUpdateProductForm = (finallyFn: () => void) => {
	const { mutateAsync } = useUpdateProduct()
	const { product, setProduct } = useProductContext()

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
			setProduct(prev => ({ ...prev, ...data }))

			form.reset({ ...data, price: parseFloat(data.price) })
		} catch {
			form.reset()
		} finally {
			finallyFn()
		}
	}

	return { ...form, onSubmit }
}
