import { AuthService } from '@/services'
import { API_URL, TOKENS } from '@/shared/constants'
import axiosBase from 'axios'
import { getCookie } from 'cookies-next'

export const axios = axiosBase.create({
	withCredentials: true,
	baseURL: API_URL,
	headers: {
		"Content-Type":'application/json'
	}
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
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.refreshToken()
				return axios.request(originalRequest)
			} catch {}
		}
		throw error
	}
)
