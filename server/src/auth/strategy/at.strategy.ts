import { PrismaService } from "@/common";
import { ACCESS_TOKEN_SECRET, TOKENS } from "@/shared/constants";

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from 'passport-jwt'


export type TypeJwtPayload = {
	sub: string
	email: string
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private prisma: PrismaService) {
        const extractJwtFromCookie = (req: Request) => {
			let token = null
			if (req && req.cookies) {
				token = req.cookies[TOKENS.ACCESS_TOKEN]
			}
			return token ?? ExtractJwt.fromAuthHeaderAsBearerToken()(req)
		}
        super({
			secretOrKey: ACCESS_TOKEN_SECRET,
			jwtFromRequest: extractJwtFromCookie,
			ignoreExpiration: false
		})
    }
    async validate(payload: TypeJwtPayload) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: payload.email,
				id: payload.sub
			}
		})
		if (!user) throw new UnauthorizedException('Unauthorized')

		return payload
	}
}