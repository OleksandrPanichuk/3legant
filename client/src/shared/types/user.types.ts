export type UserRole = 'CUSTOMER' | 'MANAGER' | 'ADMIN'

export type TypeUser = {
	id: string
	username: string
	name: string
	email: string
	createdAt: Date
	updatedAt: Date
	role: UserRole
}

export type TypeUserWithAvatar = TypeUser & {
	avatar?: {
		url: string
		key: string
	}
}
