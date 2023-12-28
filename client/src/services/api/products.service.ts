import { axios } from '@/lib'
import { CreateProductInput, createProductSchema } from '@/services'

export enum ProductsServiceRoutes {
	PRODUCTS = '/products',
}

export class ProductsService {
	static async create(dto: CreateProductInput) {
		createProductSchema.parse(dto)

		const formData = new FormData()

		Object.entries(dto).forEach(([k, value]) => {
			const key = k as keyof CreateProductInput
			if (key === 'categories') {
				return formData.append(key, JSON.stringify(value))
			}
			if (key === 'previewImage') {
				return formData.append(key, value as File)
			}
			return formData.append(key, String(value))
		})

		return await axios.post(ProductsServiceRoutes.PRODUCTS, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	}
}
