'use client'
import { useAuth } from '@/components/providers'
import { Divider, Flex, Show } from '@chakra-ui/react'
import { notFound } from 'next/navigation'
import { PropsWithChildren } from 'react'
import { Navbar, Sidebar } from './components'
import styles from './DashboardLayout.module.scss'
import { Container } from '@/components/ui'

export const DashboardLayout = ({ children }: PropsWithChildren) => {
	// const { isPending, user } = useAuth()
	// if ((!isPending && user && user.role === 'CUSTOMER') || !user) {
	// 	return notFound()
	// }
	return (
		<Flex minHeight={'100%'}>
			<Show breakpoint="(min-width: 48rem)">
				<Sidebar />
			</Show>
			<div className={styles.main}>
				<Navbar />
				<Divider />
				<Container className={styles.container}>{children}</Container>
			</div>
		</Flex>
	)
}
