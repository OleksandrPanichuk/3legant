import { axios } from '@/lib'
import {
	UpdateProductInfoInput,
	UpdateProductInfoResponse,
	UpdateProductInput,
	UpdateProductResponse,
	createProductSchema,
	findAllProductsSchema,
	updateProductInfoSchema,
	updateProductSchema,
	type CreateProductInput,
	type FindAllProductsInput,
	type FindAllProductsResponse,
} from '@/services'
import type { TypeFullProduct, TypeProduct } from '@/shared/types'
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

	static async findById(id: string): Promise<AxiosResponse<TypeFullProduct>> {
		const url = `${ProductsServiceRoutes.PRODUCTS}/${id}`
		return axios.get<TypeFullProduct>(url)
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

		return await axios.post<TypeProduct>(
			ProductsServiceRoutes.PRODUCTS,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			}
		)
	}

	static async update(
		dto: UpdateProductInput,
		id: string
	): Promise<AxiosResponse<UpdateProductResponse>> {
		updateProductSchema.parse(dto)
		const url = `${ProductsServiceRoutes.PRODUCTS}/${id}`
		return await axios.patch<UpdateProductResponse>(url, dto)
	}

	static async updateInfo(
		dto: UpdateProductInfoInput,
		productId: string
	): Promise<AxiosResponse<UpdateProductInfoResponse>> {
		updateProductInfoSchema.parse(dto)
		const url = `${ProductsServiceRoutes.PRODUCTS}/${productId}/info`
		return await axios.patch<UpdateProductInfoResponse>(url, dto)
	}
}
