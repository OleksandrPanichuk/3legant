'use server'
import { AuthService } from '@/services'
import { API_URL, TOKENS } from '@/shared/constants'
import axiosBase from 'axios'
import { cookies } from 'next/headers'

export const axiosServer = axiosBase.create({
	withCredentials: true,
	baseURL: API_URL,
	headers: {
		"Content-Type":'application/json'
	}
})

axiosServer.interceptors.request.use(function (config) {
	const accessToken = cookies().get(TOKENS.ACCESS_TOKEN)?.value
	if (accessToken && config?.headers) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

axiosServer.interceptors.response.use(
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
				const { data } = await AuthService.refreshToken({
					headers: {
						Cookie: cookies().toString(),
					},
				})

				return axiosServer.request({
					...originalRequest,
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
						Cookie: {
							access_token: data.accessToken,
						},
					},
				})
			} catch {}
		}
		throw error
	}
)
