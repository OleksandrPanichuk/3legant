'use client'

import { useAuth } from '@/components/providers'
import { Heading, Typography } from '@/components/ui'
import { AuthService } from '@/services'
import { Routes } from '@/shared/constants'
import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	SkeletonCircle,
} from '@chakra-ui/react'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { LogOut as LogOutIcon } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { menuLinks } from './UserButton.data'

import styles from './UserButton.module.scss'

export const UserButton = () => {
	const { user, isPending, setUser } = useAuth()
	const router = useRouter()

	const { mutate: signOut } = useMutation({
		mutationFn: () => AuthService.signOut(),
		onSuccess: () => {
			setUser(null)
			redirect(Routes.ROOT)
		},
		onError: error => {
			if (error instanceof AxiosError) {
				return toast.error(
					error.response?.data.message ?? 'Something went wrong'
				)
			}
			return toast.error('Something went wrong')
		},
	})

	if (isPending) {
		return <SkeletonCircle width={32} />
	}

	if (!user) return null

	return (
		<Menu>
			<MenuButton>
				<Avatar
					width={'2.5rem'}
					height={'2.5rem'}
					name={user.name}
					src={user.avatar?.key}
				/>
			</MenuButton>
			<MenuList className={styles.list}>
				<Flex  className={styles.info}>
					<Heading className={styles.username} size={'xs'} as='h5'>{user.name}</Heading>
					<Typography className={styles.email} size={'sm'}>{user.email}</Typography>
				</Flex>
				<MenuDivider />
				{menuLinks.map(link => {
					const Icon = link.icon
					return (
						<MenuItem
							onClick={() => router.push(link.href)}
							icon={<Icon />}
							key={link.id}
						>
							{link.text}
						</MenuItem>
					)
				})}
				<MenuDivider />
				<MenuItem onClick={() => signOut()} icon={<LogOutIcon />}>
					Log Out
				</MenuItem>
			</MenuList>
		</Menu>
	)
}
