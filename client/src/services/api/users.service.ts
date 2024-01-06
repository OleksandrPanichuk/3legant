import { axios, axiosServer } from '@/lib'
import {
	FindAllUsersInput,
	FindAllUsersResponse,
	UpdateUserRoleInput,
	findAllUsersSchema,
	updateUserRoleSchema,
} from '@/services'
import { TypeUser, TypeUserWithAvatar } from '@/shared/types'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'query-string'

export enum UsersServiceRoutes {
	CURRENT_USER = '/users/me',
	USERS = '/users',
	ROLE = '/role',
}

export class UsersService {
	static async currentUser(
		isServer: boolean = false,
		config: AxiosRequestConfig = {}
	): Promise<AxiosResponse<TypeUserWithAvatar | undefined>> {
		if (!isServer) {
			return await axios.get<TypeUserWithAvatar | undefined>(
				UsersServiceRoutes.CURRENT_USER,
				config
			)
		} else {
			return await axiosServer.get<TypeUserWithAvatar | undefined>(
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

	static async updateRole(
		dto: UpdateUserRoleInput
	): Promise<AxiosResponse<TypeUser>> {
		updateUserRoleSchema.parse(dto)
		return await axios.patch<TypeUser>(
			`${UsersServiceRoutes.USERS}/${dto.userId}${UsersServiceRoutes.ROLE}`, {role:dto.role}
		)
	}
}
