import { UsersService } from '@/services'
import { TypeUser } from '@/shared/types'

export async function currentUser(): Promise<TypeUser | undefined> {
	try {
		const response = await UsersService.currentUser(true)
		return response.data
	} catch (err) {
		return
	}
}