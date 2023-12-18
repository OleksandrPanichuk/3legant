import { signInSchema, signUpSchema } from "@/lib"
import { TypeUser } from "@/shared/types"
import { z } from "zod"

export type TypeTokens = {
    accessToken:string
    refreshToken:string 
}


export type TypeSignUpResponse = {
    user:TypeUser
    tokens:TypeTokens
}

export type TypeSignInResponse = TypeSignUpResponse


export type TypeSignInInput  = z.infer<typeof signInSchema>
export type TypeSignUpInput = z.infer<typeof signUpSchema>