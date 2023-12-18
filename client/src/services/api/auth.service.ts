import { axios, signInSchema, signUpSchema } from "@/lib";
import { TypeSignInInput, TypeSignInResponse, TypeSignUpResponse, TypeSignUpInput } from "@/shared/types";
import { AxiosResponse } from "axios";

export class AuthApi {
    static async signIn(dto: TypeSignInInput): Promise<AxiosResponse<TypeSignInResponse>> {
            const parsedData = signInSchema.parse(dto)
            return await axios.post<TypeSignInResponse>(`/auth/sign-in`, parsedData)
    }

    static async signUp(dto:TypeSignUpInput): Promise<AxiosResponse<TypeSignUpResponse>> {
        const parsedData = signUpSchema.parse(dto) 
        return await axios.post<TypeSignUpResponse>('/auth/sign-up',parsedData)
    }
}