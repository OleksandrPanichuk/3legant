
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength,ValidateNested } from "class-validator";
import { AuthResponseDto } from "./auth.dto";
import { UserEntity } from "@/user/user.entity";



export class SignUpInput {
    @IsString()
    @IsNotEmpty()
    @MinLength(3, {message:'Name is too short'})
    name:string

    @IsString()
    @IsNotEmpty()
    @MinLength(3, {message:'Name is too short'})
    username:string


    @IsEmail({},{message:"Invalid email address"})
    email:string

    @IsStrongPassword(null, { message: 'Password is too weak' })
	@MinLength(8, { message: 'The password must be at least 8 characters long' })
    password:string
}


export class SignUpResponse  {
    @ValidateNested()
    user: UserEntity
    
    @ValidateNested()
    tokens: AuthResponseDto
}