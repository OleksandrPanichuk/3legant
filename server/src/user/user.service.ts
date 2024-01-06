import { generateErrorResponse } from '@/common/helpers'
import { PrismaService } from '@/common/prisma'
import { omit } from '@/common/utils'
import {
	BadRequestException,
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { Prisma, UserRole } from '@prisma/client'
import { FindAllInput, FindAllResponse, UpdateRoleInput } from './dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	public async findAll(dto: FindAllInput): Promise<FindAllResponse> {
		try {
			const whereCondition: Prisma.UserWhereInput = dto.searchValue
				? {
						OR: [
							{
								username: {
									contains: dto.searchValue,
									mode: 'insensitive',
								},
							},
							{
								name: {
									contains: dto.searchValue,
									mode: 'insensitive',
								},
							},
							{
								email: {
									contains: dto.searchValue,
									mode: 'insensitive',
								},
							},
						],
					}
				: {}
			const users = await this.prisma.user.findMany({
				where: whereCondition,
				include: {
					avatar: {
						select: {
							url: true,
							key: true,
						},
					},
				},
				take: dto.take,
				skip: dto.skip,
			})

			const count = await this.prisma.user.count({
				where: whereCondition,
			})

			return {
				users: users.map(user => omit(user, ['hash', 'hashedRt'])),
				count,
			}
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}

	public async updateRole(
		dto: UpdateRoleInput,
		userId:string,
		currentUserId: string
	): Promise<UserEntity> {
		if (userId === currentUserId) {
			throw new ForbiddenException("You can't update your own role")
		}
		if (dto.role === UserRole.ADMIN) {
			throw new ForbiddenException("You can't add one more admin")
		}
		try {
			const existingUser = await this.prisma.user.findUnique({
				where: {
					id: userId,
				},
			})
			if (!existingUser) throw new NotFoundException('User not found')
			if (existingUser.role === dto.role)
				throw new BadRequestException('User already has this role')

			const updatedUser = await this.prisma.user.update({
				where: {
					id:userId,
				},
				data: {
					role: dto.role,
				},
			})

			return updatedUser
		} catch (err) {
			throw generateErrorResponse(err)
		}
	}
}
