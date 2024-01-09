import { useProductContext } from '@/components/screens/dashboard-product'
import {
	UpdateProductInfoInput,
	updateProductInfoSchema,
	useUpdateProductInfo,
} from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import isEqual from 'lodash.isequal'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export const useUpdateProductInfoForm = (finallyFn?: () => void) => {
	const { product, setProduct } = useProductContext()
	const { mutateAsync } = useUpdateProductInfo()

	const form = useForm<UpdateProductInfoInput>({
		resolver: zodResolver(updateProductInfoSchema),
		defaultValues: product.info,
	})

	const onSubmit = async (values: UpdateProductInfoInput) => {
		try {
			const dataToUpdate: Partial<UpdateProductInfoInput> = Object.entries(
				values
			).reduce(
				(updateObj, [key, value]) => {
					if (
						!isEqual(
							value,
							// @ts-ignore
							product.info[key]
						)
					) {
						updateObj[key] = value
					}
					return updateObj
				},
				{} as Record<string, string | number>
			)
			if (!Object.keys(dataToUpdate).length) {
				return toast.info('Please, change any info to update the product info')
			}

			const { data } = await mutateAsync({
				...dataToUpdate,
				productId: product.id,
			})
			setProduct(prev => ({
				...prev,
				info: data,
			}))

			form.reset({
				...data,
			})
		} catch {
			form.reset()
		} finally {
			finallyFn?.()
		}
	}
	return { ...form, onSubmit }
}
