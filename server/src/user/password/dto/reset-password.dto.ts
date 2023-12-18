import { IsNotEmpty, IsStrongPassword, IsUUID, MinLength } from "class-validator";



export class ResetPasswordInput {
    @IsNotEmpty()
    @MinLength(8, { message: 'The password must be at least 8 characters long' })
    @IsStrongPassword({minLength:8},{message:"Password is too weak"})
    password:string


    @IsUUID(4, {message:"Invalid data"})
    code:string 
}