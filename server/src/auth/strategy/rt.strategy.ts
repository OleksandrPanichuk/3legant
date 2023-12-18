import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { REFRESH_TOKEN_SECRET, TOKENS } from '@/shared/constants'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		const extractJwtFromCookie = (req: Request) => {
			let token = null
			if (req && req.cookies) {
				token = req.cookies[TOKENS.REFRESH_TOKEN]
			}
			return token ?? ExtractJwt.fromAuthHeaderAsBearerToken()(req)
		}
		super({
			jwtFromRequest: extractJwtFromCookie,
			secretOrKey: REFRESH_TOKEN_SECRET,
			passReqToCallback: true
		})
	}
	async validate(req: Request, payload: any) {
		const refreshToken = req.cookies?.[TOKENS.REFRESH_TOKEN]

		return {
			...payload,
			refreshToken
		}
	}
}