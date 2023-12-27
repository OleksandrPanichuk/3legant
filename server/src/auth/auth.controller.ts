import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LogOutInput, SignInInput, SignUpInput } from './dto';
import { Request, Response } from 'express';
import { TOKENS } from '@/shared/constants';
import { RefreshTokenGuard } from './guard';
import { AccessTokenGuard } from '@/common/guard'
import { CurrentUser } from '@/common/decorators'

@Controller('auth')
export class AuthController {
   
	constructor(
		private readonly authService: AuthService,
		
	) {
		
	}
	@Post('sign-up')
	@HttpCode(HttpStatus.CREATED)
	async signUp(@Body() input: SignUpInput, @Res() res: Response) {
		const data = await this.authService.signUp(input)

		res.cookie(TOKENS.ACCESS_TOKEN, data.tokens.accessToken, {
			httpOnly: false,
			maxAge: 1000 * 60 * 30
		})
		res.cookie(TOKENS.REFRESH_TOKEN, data.tokens.refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7
		})

		return res.send(data)
	}

	@Post('sign-in')
	@HttpCode(HttpStatus.OK)
	async signIn(@Body() dto: SignInInput, @Res() res: Response) {
		const data = await this.authService.signIn(dto)

		res.cookie(TOKENS.ACCESS_TOKEN, data.tokens.accessToken, {
			httpOnly: false,
			maxAge: 1000 * 60 * 30,
		})
		res.cookie(TOKENS.REFRESH_TOKEN, data.tokens.refreshToken, {
			httpOnly: true,
			maxAge: 1000 * 60 * 60 * 24 * 7,
		})

		return res.send(data)
	}

	@Patch('log-out')
	@UseGuards(AccessTokenGuard)
	@HttpCode(HttpStatus.OK)
	async logOut(
		@CurrentUser('id') userId: string,
		@Res() res: Response,
		@Body() dto: LogOutInput
	) {

		res.clearCookie(TOKENS.ACCESS_TOKEN)
		res.clearCookie(TOKENS.REFRESH_TOKEN)

		await this.authService.logOut(userId)

		if (dto?.redirectUrl) {
			return res
				.send({ message: 'You have successfully logged out!' })
				.redirect(dto.redirectUrl)
		}

		return res.send({ message: 'You have successfully logged out!' })
	}

	@Patch('tokens/refresh')
	@UseGuards(RefreshTokenGuard)
	@HttpCode(HttpStatus.OK)
	async refreshTokens(@Req() req: Request, @Res() res: Response) {
		const refreshToken = req.cookies?.[TOKENS.REFRESH_TOKEN]

		const tokens = await this.authService.refreshToken(refreshToken)

		res.cookie(TOKENS.ACCESS_TOKEN, tokens.accessToken, {
			httpOnly: false,
			maxAge: 1000 * 60 * 30
		})
		return res.send(tokens)
	}
	
    
}
