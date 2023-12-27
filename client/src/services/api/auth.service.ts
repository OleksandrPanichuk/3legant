import { axios } from '@/lib'
import {
	RefreshTokenResponse,
	SignInInput,
	SignInResponse,
	SignUpInput,
	SignUpResponse,
	signInSchema,
	signUpSchema,
} from '@/services'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export enum AuthServiceRoutes {
	SIGN_IN = '/auth/sign-in',
	SIGN_UP = '/auth/sign-up',
	LOG_OUT = '/auth/log-out',
	REFRESH_TOKEN = '/auth/tokens/refresh',
}
export class AuthService {
	static async signIn(
		dto: SignInInput
	): Promise<AxiosResponse<SignInResponse>> {
		const parsedData = signInSchema.parse(dto)
		return await axios.post<SignInResponse>(
			AuthServiceRoutes.SIGN_IN,
			parsedData
		)
	}

	static async signOut(redirectUrl?: string) {
		return await axios.patch(AuthServiceRoutes.LOG_OUT, { redirectUrl })
	}

	static async signUp(
		dto: SignUpInput
	): Promise<AxiosResponse<SignUpResponse>> {
		const parsedData = signUpSchema.parse(dto)
		return await axios.post<SignUpResponse>(
			AuthServiceRoutes.SIGN_UP,
			parsedData
		)
	}

	static async refreshToken(
		config: AxiosRequestConfig<RefreshTokenResponse> = {}
	): Promise<AxiosResponse<RefreshTokenResponse>> {
		return await axios.patch<RefreshTokenResponse>(
			AuthServiceRoutes.REFRESH_TOKEN,
			{},
			config
		)
	}
}
