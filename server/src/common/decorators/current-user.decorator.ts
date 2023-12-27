import { Redis } from '@/common/helpers'
import { omit } from '@/common/utils'
import { ACCESS_TOKEN_SECRET, TOKENS } from '@/shared/constants'
import { TypeTokenDecoded } from '@/shared/types'
import { UserEntityWithAvatar, UserEntityWithHashes } from '@/user/user.entity'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaClient } from '@prisma/client'
import { Request } from 'express'
import { ExtractJwt } from 'passport-jwt'

const prisma = new PrismaClient()
const redis = Redis.getInstance()
const jwtService = new JwtService()

const omittedFields = ['hash', 'hashedRt']

type User = UserEntityWithAvatar & UserEntityWithHashes

export const CurrentUser = createParamDecorator(
	async <T extends keyof UserEntityWithAvatar>(
		data: T | undefined,
		context: ExecutionContext
	): Promise<UserEntityWithAvatar | undefined | UserEntityWithAvatar[T]> => {
		const request = context.switchToHttp().getRequest<Request>()

		const token =
			request.cookies[TOKENS.ACCESS_TOKEN] ??
			(ExtractJwt.fromAuthHeaderAsBearerToken()(request) as string | undefined)
		if (!token) {
			return
		}

		const decodedToken = jwtService.verify<TypeTokenDecoded>(token, {
			secret: ACCESS_TOKEN_SECRET,
		})

		if (!decodedToken.sub) {
			return
		}

		const cachedUser = JSON.parse(
			await redis.get(`user:${decodedToken.sub}`)
		) as UserEntityWithAvatar | undefined

		if (cachedUser?.id && !['hash', 'hashedRt'].includes(data)) {
			if (data) {
				return cachedUser[data]
			}
			return cachedUser
		}

		const dbUser: User = await prisma.user.findUnique({
			where: {
				id: decodedToken.sub,
			},
			include: {
				avatar: {
					select: {
						url: true,
						key: true,
					},
				},
			},
		})

		if (!dbUser) {
			return
		}

		if (!omittedFields.includes(data)) {
			await redis.set(
				`user:${decodedToken.sub}`,
				JSON.stringify(omit({ ...dbUser }, ['hash', 'hashedRt'])),
				'EX',
				7200
			)
		}

		if (data) {
			return dbUser[data]
		}
		return omit(dbUser, ['hash', 'hashedRt'])
	}
)
