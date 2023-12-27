import { axios, axiosServer } from '@/lib'
import {
	FindAllUsersInput,
	FindAllUsersResponse,
	findAllUsersSchema,
} from '@/services'
import { TypeUser } from '@/shared/types'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'query-string'

export enum UsersServiceRoutes {
	CURRENT_USER = '/users/me',
	USERS = '/users',
}

export class UsersService {
	static async currentUser(
		isServer: boolean = false,
		config: AxiosRequestConfig = {}
	): Promise<AxiosResponse<TypeUser | undefined>> {
		if (!isServer) {
			return await axios.get<TypeUser | undefined>(
				UsersServiceRoutes.CURRENT_USER,
				config
			)
		} else {
			return await axiosServer.get<TypeUser | undefined>(
				UsersServiceRoutes.CURRENT_USER,
				config
			)
		}
	}

	static async findAll(
		dto: FindAllUsersInput = {}
	): Promise<AxiosResponse<FindAllUsersResponse>> {
		findAllUsersSchema.parse(dto)

		const url = qs.stringifyUrl({
			url: UsersServiceRoutes.USERS,
			query: dto,
		})

		return await axios.get<FindAllUsersResponse>(url)
	}
}
