import { UserRole } from "@/shared/types"

export const roles: Record<UserRole, { text: string; colorScheme: string }> = {
	ADMIN: {
		text: 'Admin',
		colorScheme: 'purple',
	},
	CUSTOMER: {
		text: 'Customer',
		colorScheme: 'green',
	},
	MANAGER: {
		text: 'Manager',
		colorScheme: 'blue',
	},
}
