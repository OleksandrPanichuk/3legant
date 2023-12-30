import { axios } from '@/lib'
import {
	CreateProductInput,
	FindAllProductsInput,
	FindAllProductsResponse,
	createProductSchema,
	findAllProductsSchema,
} from '@/services'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export enum ProductsServiceRoutes {
	PRODUCTS = '/products',
	PRODUCTS_DASHBOARD = '/products/admin',
}

export class ProductsService {
	static async findAll(
		dto: FindAllProductsInput,
		isDashboard: boolean = false
	): Promise<AxiosResponse<FindAllProductsResponse>> {
		findAllProductsSchema.parse(dto)

		const url = qs.stringifyUrl({
			url: isDashboard
				? ProductsServiceRoutes.PRODUCTS_DASHBOARD
				: ProductsServiceRoutes.PRODUCTS,
			query: {
				...dto,
				prices: JSON.stringify(dto.prices),
			},
		})

		return await axios.get<FindAllProductsResponse>(url)
	}

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
