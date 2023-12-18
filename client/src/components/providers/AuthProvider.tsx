'use client'
import { UserApi } from '@/services'
import { TypeUser } from '@/shared/types'
import { useQuery } from '@tanstack/react-query'

import {
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	createContext,
	useContext,
	useState
} from 'react'
import { Loading } from '@/components/common'

interface IAuthContext {
	user: TypeUser | null
	setUser: Dispatch<SetStateAction<TypeUser | null>>
	isPending: boolean
}


export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({
	children
}: PropsWithChildren) => {
	const [user, setUser] = useState<TypeUser | null>(null)

	const { isPending } = useQuery({
		queryKey: ['current-user'],
		queryFn: async () => {
			const response = await UserApi.currentUser()
			response.data && setUser(response.data)
			return response
		},
		retry:false,
		enabled: !user
	})

	if (isPending) {
		return <Loading />
	}

	return (
		<AuthContext.Provider value={{ user, setUser, isPending }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
