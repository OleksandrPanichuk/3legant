import { AuthService } from '@/services'
import { API_URL, TOKENS } from '@/shared/constants'
import axiosBase from 'axios'
import { getCookie } from 'cookies-next'


export const plainAxios = axiosBase.create({
	withCredentials: true,
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const axios = axiosBase.create({
	withCredentials: true,
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

axios.interceptors.request.use(function (config) {
	const accessToken = getCookie(TOKENS.ACCESS_TOKEN)
	if (accessToken && config?.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

axios.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config
		if (
			error?.response?.status === 401 &&
			error.config &&
			!originalRequest._retry
		) {
			originalRequest._retry = true
			try {
				await AuthService.refreshToken()
				return axios.request(originalRequest)
			} catch (error) {
				
			}
		}
		throw error
	}
)
