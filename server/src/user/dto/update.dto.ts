import { UserRole } from '@prisma/client'
import { IsEnum } from 'class-validator'

export class UpdateRoleInput {
	@IsEnum(UserRole)
	role: UserRole
}
