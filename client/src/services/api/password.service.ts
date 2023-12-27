import { absolutePath, axios } from '@/lib'
import {
	resetPasswordSchema,
	sendPasswordResetLinkSchema,
	verifyResetPasswordCodeSchema,
} from '@/services'
import { Routes } from '@/shared/constants'
import { AxiosResponse } from 'axios'
import { z } from 'zod'

export enum PasswordServiceRoutes {
	SEND_RESET_PASSWORD_LINK = '/user/password/reset/send',
    RESET = '/user/password/reset',
    VERIFY = '/user/password/verify'
}

export class PasswordService {
	static async sendResetPasswordLink(
		email: string
	): Promise<AxiosResponse<string>> {
		sendPasswordResetLinkSchema.parse(email)
		return await axios.post<string>(PasswordServiceRoutes.SEND_RESET_PASSWORD_LINK, {
			email,
			link: absolutePath(Routes.RESET_PASSWORD),
		})
	}

	static async verifyCode(code: string) {
		verifyResetPasswordCodeSchema.parse(code)
		return await axios.get<boolean>(`${PasswordServiceRoutes.VERIFY}/${code}`)
	}

	static async resetPassword(input: z.infer<typeof resetPasswordSchema>) {
		resetPasswordSchema.parse(input)
		return await axios.patch<string>(PasswordServiceRoutes.RESET, input)
	}
}
