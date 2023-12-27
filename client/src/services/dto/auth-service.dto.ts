import { TypeTokens, TypeUser } from "@/shared/types"
import { z } from "zod"



export const signInSchema = z.object({
    emailOrUsername: z.string().min(1, "Username or Email is required"),
    password: z.string({required_error:'Password is required'}).min(8, {message:"Password is too short"})
})

export const signUpSchema = z.object({
    name: z.string().min(3, "Name is too short"),
    username: z.string().min(3, "Username is too short"),
    email: z.string().min(1, 'Email is required').email('Invalid email address'),
    password: z.string().min(8, 'Password is too short')
})



export type SignUpResponse = {
    user:TypeUser
    tokens:TypeTokens
}

export type SignInResponse = SignUpResponse


export type SignInInput  = z.infer<typeof signInSchema>
export type SignUpInput = z.infer<typeof signUpSchema>


export type RefreshTokenResponse = {
    accessToken: string
}