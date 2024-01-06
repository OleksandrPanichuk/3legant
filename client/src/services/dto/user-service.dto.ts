import { UserRoles } from '@/shared/constants'
import { TypeUser, TypeUserWithAvatar } from '@/shared/types'
import { z } from 'zod'

export type TypeSortByUsers = 'name' | 'username' | 'email' | 'role'

export const findAllUsersSchema = z.object({
	searchValue: z.string().optional(),
	take: z.number().nonnegative().optional(),
	skip: z.number().nonnegative().optional(),
})


export type FindAllUsersInput = z.infer<typeof findAllUsersSchema>

export type FindAllUsersResponse = {
	users: TypeUserWithAvatar[]
	count: number
}


export const updateUserRoleSchema = z.object({
	role: z.enum(UserRoles, {invalid_type_error:'Please, select one of allowed roles'})
})

export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema> &  {
	userId:string
}