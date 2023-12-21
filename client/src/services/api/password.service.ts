import { absolutePath, axios } from "@/lib";
import { Routes } from "@/shared/constants";
import { AxiosResponse } from "axios";
import { z } from "zod";
import { resetPasswordSchema, sendPasswordResetLinkSchema, verifyResetPasswordCodeSchema } from "@/services";



export class PasswordService {
    static async sendResetPasswordLink(email:string): Promise<AxiosResponse<string>> {
        sendPasswordResetLinkSchema.parse(email)
        return await axios.post<string>('/user/password/reset/send', {
            email,
            link: absolutePath(Routes.RESET_PASSWORD)
        })
    }


    static async verifyCode(code:string) {
        verifyResetPasswordCodeSchema.parse(code)
        return await axios.get<boolean>(`/user/password/verify/${code}`)
    }

    static async resetPassword(input: z.infer<typeof resetPasswordSchema> ) {
        resetPasswordSchema.parse(input)
        return await axios.patch<string>('/user/password/reset', input)
    }
}