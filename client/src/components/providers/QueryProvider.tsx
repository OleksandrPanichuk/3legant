'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, Suspense } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 5 * 60 * 1000
		}
	}
})

export const QueryProvider = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={null}>
				<ReactQueryDevtools />
			</Suspense>
			{children}
		</QueryClientProvider>
	)
}
