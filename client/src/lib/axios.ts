import { API_URL, TOKENS } from '@/shared/constants'
import axiosBase from 'axios'
import {getCookie} from 'cookies-next'

export const axios = axiosBase.create({
	withCredentials: true,
	baseURL: API_URL,
})

axios.interceptors.request.use(function(config) {
    const accessToken = getCookie(TOKENS.ACCESS_TOKEN)
   if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
   }
    return config
})