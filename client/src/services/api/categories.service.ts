import { axios } from '@/lib'
import qs from 'query-string'
import { FindAllCategoriesInput, FindAllCategoriesResponse } from '@/services'
import { AxiosResponse } from 'axios'
 

export class CategoriesService {
    static async findAll(dto: FindAllCategoriesInput = {}): Promise<AxiosResponse<FindAllCategoriesResponse>> {
        const url = qs.stringifyUrl({
            url:'/categories',
            query :dto
        })
        return await axios.get<FindAllCategoriesResponse>(url)
    }
}