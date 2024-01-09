'use client'
import { useAuth } from '@/components/providers'
import { Container } from '@/components/ui'
import { Divider, Flex, Show } from '@chakra-ui/react'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import styles from './DashboardLayout.module.scss'
import { Navbar, Sidebar } from './components'

export const DashboardLayout = ({ children }: PropsWithChildren) => {
	const { isPending, user } = useAuth()
	if ((!isPending && user && user.role === 'CUSTOMER') || !user) {
		return notFound()
	}
	return (
		<Flex minHeight={'100%'}>
			<Show breakpoint='(min-width: 48rem)'>
				<Sidebar />
			</Show>
			<div className={styles.main}>
				<Navbar />
				<Divider />
				<Container as='main' className={styles.container}>
					{children}
				</Container>
			</div>
		</Flex>
	)
}
