'use client'

import {
	AuthProvider,
	QueryProvider,
} from '@/components/providers'
import { TypeUser } from '@/shared/types'
import { ChakraProvider } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

interface IRootProviderProps {
	initialUser?: TypeUser
}

export const RootProviders = ({
	children,
	initialUser,
}: PropsWithChildren<IRootProviderProps>) => {
	return (
		<QueryProvider>
			<AuthProvider initialUser={initialUser}>
				<ChakraProvider>
					<Toaster position='bottom-right' />
					{children}
				</ChakraProvider>
			</AuthProvider>
		</QueryProvider>
	)
}
