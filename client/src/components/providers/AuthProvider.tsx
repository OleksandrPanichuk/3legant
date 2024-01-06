'use client'
import { UsersService } from '@/services'
import { TypeUser, TypeUserWithAvatar } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'

import { Loading } from '@/components/common'
import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from 'react'

interface IAuthContext {
	user: TypeUserWithAvatar | null
	setUser: Dispatch<SetStateAction<TypeUser | null>>
	isPending: boolean
}
interface IAuthProviderProps {
	initialUser?: TypeUser
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({
	children,
	initialUser,
}: PropsWithChildren<IAuthProviderProps>) => {
	const [user, setUser] = useState<TypeUser | null>(initialUser ?? null)

	const { isFetching } = useQuery({
		queryKey: ['current-user'],
		queryFn: async () => {
			const response = await UsersService.currentUser()
			response.data && setUser(response.data)
			return response
		},
		retry: false,
		enabled: !user,
	})

	if (isFetching) {
		return <Loading />
	}

	return (
		<AuthContext.Provider value={{ user, setUser, isPending: isFetching }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
