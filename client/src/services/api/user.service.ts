import { axios } from "@/lib";
import { TypeUser } from "@/shared/types";
import { AxiosResponse, AxiosRequestConfig } from "axios";
import {findAllUsersSchema, FindAllUsersInput, FindAllUsersResponse} from '@/services'
import qs from 'query-string'

export class UserApi {
    static async currentUser(config:AxiosRequestConfig = {}): Promise<AxiosResponse<TypeUser | undefined>> {
        return await axios.get<TypeUser | undefined>('/users/me',config)
    }


    static async findAll(dto: FindAllUsersInput = {}): Promise<AxiosResponse<FindAllUsersResponse>> {
        findAllUsersSchema.parse(dto)

        const url = qs.stringifyUrl({
            url:'/users',
            query: dto
        })

        return await axios.get<FindAllUsersResponse>(url)
    }
}