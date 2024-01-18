import { axios } from '@/lib'
import {
	createProductSchema,
	deleteProductImageSchema,
	findAllProductsSchema,
	updateProductImageStatusSchema,
	updateProductInfoSchema,
	updateProductSchema,
	type AddProductImageInput,
	type AddProductImageResponse,
	type CreateProductInput,
	type DeleteProductImageInput,
	type FindAllProductsInput,
	type FindAllProductsResponse,
	type UpdateProductImageStatusInput,
	type UpdateProductInfoInput,
	type UpdateProductInfoResponse,
	type UpdateProductInput,
	type UpdateProductResponse,
} from '@/services'
import type {
	TypeFullProduct,
	TypeProduct,
	TypeProductImage,
} from '@/shared/types'
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

	static async addImage(
		dto: AddProductImageInput,
		productId: string
	): Promise<AxiosResponse<AddProductImageResponse>> {
		const formData = new FormData()

		formData.append('image', dto.file)
		formData.append('isPreview', JSON.stringify(dto.isPreview))

		const url = `${ProductsServiceRoutes.PRODUCTS}/${productId}/images`
		return await axios.post<AddProductImageResponse>(url, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	}

	static async deleteImage(
		dto: DeleteProductImageInput
	): Promise<AxiosResponse<string>> {
		deleteProductImageSchema.parse(dto)

		const url = `${ProductsServiceRoutes.PRODUCTS}/${dto.productId}/images/${dto.imageId}`
		return await axios.delete<string>(url)
	}

	static async updateImageStatus(
		dto: UpdateProductImageStatusInput
	): Promise<AxiosResponse<TypeProductImage>> {
		updateProductImageStatusSchema.parse(dto)

		const url = `${ProductsServiceRoutes.PRODUCTS}/${dto.productId}/images/${dto.imageId}/status`

		return await axios.patch<TypeProductImage>(url)
	}
}
