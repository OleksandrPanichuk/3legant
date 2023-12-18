import { axios } from "@/lib";
import { TypeUser } from "@/shared/types";
import { AxiosResponse, AxiosRequestConfig } from "axios";



export class UserApi {
    static async currentUser(config:AxiosRequestConfig = {}): Promise<AxiosResponse<TypeUser | undefined>> {
        return await axios.get<TypeUser | undefined>('/user/me',config)
    }
}