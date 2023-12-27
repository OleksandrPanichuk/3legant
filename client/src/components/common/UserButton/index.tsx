'use client'

import { useAuth } from '@/components/providers'
import { AuthService } from '@/services'
import { Routes } from '@/shared/constants'
import {
	Avatar,
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
			<MenuList paddingInline={'4px'}>
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
