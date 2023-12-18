import { UserEntity } from '@/user/user.entity'
import { IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator'
import { AuthResponseDto } from './auth.dto'

export class SignInInput {
    @IsString()
    @IsNotEmpty()
	readonly emailOrUsername: string

	@IsString()
	@IsNotEmpty()
	@MinLength(8, { message: 'The password must be at least 8 characters long' })
	readonly password: string
}


export class SignInResponse  {
    @ValidateNested()
    user: UserEntity
    
    @ValidateNested()
    tokens: AuthResponseDto
}