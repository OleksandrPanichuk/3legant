import { axios } from '@/lib'
import {
	CreateCategoryInput,
	FindAllCategoriesInput,
	FindAllCategoriesResponse,
	UpdateCategoryInput,
	newCategorySchema,
	updateCategorySchema,
} from '@/services'
import { TypeCategory } from '@/shared/types'
import { AxiosResponse } from 'axios'
import qs from 'query-string'

export enum CategoriesServiceRoutes {
	CATEGORIES = '/categories',
}

export class CategoriesService {
	static async findAll(
		dto: FindAllCategoriesInput = {}
	): Promise<AxiosResponse<FindAllCategoriesResponse>> {
		const url = qs.stringifyUrl({
			url: CategoriesServiceRoutes.CATEGORIES,
			query: dto,
		})
		return await axios.get<FindAllCategoriesResponse>(url)
	}

	static async create(
		dto: CreateCategoryInput
	): Promise<AxiosResponse<TypeCategory>> {
		newCategorySchema.parse(dto)
		return await axios.post<TypeCategory>(
			CategoriesServiceRoutes.CATEGORIES,
			dto
		)
	}

	static async update(
		dto: UpdateCategoryInput
	): Promise<AxiosResponse<TypeCategory>> {
		updateCategorySchema.parse(dto)
		return await axios.put<TypeCategory>(
			`${CategoriesServiceRoutes.CATEGORIES}/${dto.id}`,
			{ name: dto.name }
		)
	}

	static async delete(id: string): Promise<AxiosResponse<string>> {
		return await axios.delete<string>(
			`${CategoriesServiceRoutes.CATEGORIES}/${id}`
		)
	}
}
