import { PrismaService, bcrypt, generateErrorResponse, omit } from '@/common';
import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthResponseDto, RefreshTokenResponse, SignInInput, SignInResponse, SignUpInput, SignUpResponse } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '@/shared/constants';
import { UserEntity } from '@/user/user.entity';
import { TypeTokenDecoded } from '@/shared/types';

@Injectable()
export class AuthService {

    constructor(private prisma:PrismaService, private jwtService: JwtService) {}


    public async signUp(input:SignUpInput): Promise<SignUpResponse> {
        try {
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            email: input.email
                        },
                        {
                            username: input.username
                        }
                    ]
                }
            })
            if(existingUser) {
                throw new ConflictException('User with same credentials already exist')
            }

            const hash = await bcrypt.hash(input.password)

            const user: UserEntity =  await this.prisma.user.create({
				data: {
                    email:input.email,
                    hash,
                    name:input.name,
                    username: input.username
                }
			})

            const tokens = await this.getTokens(
				user.id,
				user.email,
			)
			await this.updateRtHash(user.id, tokens.refreshToken)

            return {
                user: omit(user,['hash','hashedRt']),
                tokens
            }
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }

    public async signIn(input: SignInInput): Promise<SignInResponse> {
		try {
			const user: UserEntity = await this.prisma.user.findFirst({
				where: {
                    OR: [
                        {
                            email: input.emailOrUsername
                        },
                        {
                            username: input.emailOrUsername
                        }
                    ]
                }
			})
			if (!user)
				throw new NotFoundException('User not found')

			if (!user?.hash)
				throw new BadRequestException('Password is not set')

			const isPasswordsMatches = await bcrypt.compare(input.password, user.hash)

			if (!isPasswordsMatches)
				throw new ForbiddenException("Passwords don't match")

			const tokens = await this.getTokens(
				user.id,
				user.email,
			)

			await this.updateRtHash(user.id, tokens.refreshToken)

			return {
                user: omit(user,['hash','hashedRt']),
                tokens
            }
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
    public async logOut(userId: string) {
		try {
            if(!userId) {
                throw new BadRequestException('User Id is missed')
            }
			const isUserExist = await this.prisma.user.findUnique({
				where: {
					id: userId
				}
			})
			if (!isUserExist)
				throw new NotFoundException('User not found', {
					cause: new Error(),
					description: 'auth/user-not-found'
				})
			await this.prisma.user.update({
				where: {
					id: userId,
					hashedRt: {
						not: null
					}
				},
				data: {
					hashedRt: null
				}
			})
		} catch (err) {console.log(err)
			throw generateErrorResponse(err)
		}
	}


    public async refreshToken(rt: string): Promise<RefreshTokenResponse> {
		try {
			const tokenDecoded = this.jwtService.decode(rt) as TypeTokenDecoded

			const now = Date.now() / 1000

			if (tokenDecoded.exp < now) {
				throw new UnauthorizedException('Unauthorized', {
					cause: 'The refresh token has expired',
					description: 'auth/invalid-refresh-token'
				})
			}

			const user = await this.prisma.user.findUnique({
				where: {
					id: tokenDecoded.sub
				}
			})

			if (!user)
				throw new NotFoundException('User not found', {
					description: 'auth/user-not-found'
				})

			if (!user?.hashedRt)
				throw new UnauthorizedException('Cannot refresh tokens', {
					cause: 'User is not logged in',
					description: 'auth/refresh-error'
				})

			const rtMatches = await bcrypt.compare(rt, user.hashedRt)

			if (!rtMatches)
				throw new ForbiddenException('Access Denied.', {
					cause: 'Refresh token do not match with token in database',
					description: 'auth/invalid-token'
				})

            const token = this.jwtService.sign({
                sub: user.id,
                email: user.email,
            },
            {
                expiresIn: '30m',
                secret: ACCESS_TOKEN_SECRET
            })

			
			
			return {accessToken:token}
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}


    private async getTokens(
		userId: string,
		email: string,
	): Promise<AuthResponseDto> {
        const [at, rt] = await Promise.all([
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					expiresIn: '30m',
					secret: ACCESS_TOKEN_SECRET
				}
			),
			this.jwtService.signAsync(
				{
					sub: userId,
					email,
				},
				{
					expiresIn: '7d',
					secret: REFRESH_TOKEN_SECRET
				}
			)
		])
        
        return {accessToken:at, refreshToken:rt}
    }

    private async updateRtHash(userId: string, rt: string) {
		const hashedRt = await bcrypt.hash(rt)
		await this.prisma.user.update({
			where: {
				id: userId
			},
			data: {
				hashedRt
			}
		})
	}
}
