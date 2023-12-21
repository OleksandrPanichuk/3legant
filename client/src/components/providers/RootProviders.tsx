'use client'

import { PropsWithChildren } from 'react'
import { AuthProvider, QueryProvider } from '@/components/providers'
import { ChakraProvider } from '@chakra-ui/react'
import { Toaster } from 'sonner'

export const RootProviders = ({ children }: PropsWithChildren) => {
	return (
		<QueryProvider>
			<AuthProvider>
				<ChakraProvider>
					<Toaster position="bottom-right" />
					{children}
				</ChakraProvider>
			</AuthProvider>
		</QueryProvider>
	)
}
