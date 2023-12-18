import { IsJWT } from 'class-validator'

export class AuthResponseDto {
	@IsJWT()
	readonly accessToken: string

	@IsJWT()
	readonly refreshToken: string
}


export class RefreshTokenResponse {
	@IsJWT()
	readonly accessToken: string
}