import { axios} from "@/lib";
import { SignInInput,signInSchema, signUpSchema , SignInResponse, SignUpInput, SignUpResponse} from "@/services";
import { AxiosResponse } from "axios";

export class AuthApi {
    static async signIn(dto: SignInInput): Promise<AxiosResponse<SignInResponse>> {
            const parsedData = signInSchema.parse(dto)
            return await axios.post<SignInResponse>(`/auth/sign-in`, parsedData)
    }

    static async signOut(redirectUrl?:string) {
        return await axios.patch('/auth/log-out', {redirectUrl})
    }

    static async signUp(dto:SignUpInput): Promise<AxiosResponse<SignUpResponse>> {
        const parsedData = signUpSchema.parse(dto) 
        return await axios.post<SignUpResponse>('/auth/sign-up',parsedData)
    }
}