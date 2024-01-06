'use client'
import { ChangeUserRoleModal } from '@/components/modals'
import { useAuth } from '@/components/providers'
import { Routes } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import {
	Center,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import { MoreHorizontal, ShieldCheck, UserCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ICustomerActionsProps {
	user: TypeUser
}

export const CustomerActions = ({ user }: ICustomerActionsProps) => {
	const router = useRouter()
	const { user: currentUser } = useAuth()

	return (
		<Menu placement='bottom-end'>
			<MenuButton
				display={'flex'}
				alignItems={'center'}
				justifyContent={'center'}
				as={IconButton}
				aria-label='actions'
			>
				<Center>
					<MoreHorizontal />
				</Center>
			</MenuButton>
			<MenuList padding={'4px'}>
				<MenuItem
					onClick={() => router.push(`${Routes.PROFILE}/${user.id}`)}
					icon={<UserCircle />}
				>
					Visit profile
				</MenuItem>
				{currentUser?.role === 'ADMIN' && currentUser?.id !== user.id && (
					<ChangeUserRoleModal userId={user.id} role={user.role}>
						<MenuItem icon={<ShieldCheck />}>Change Role</MenuItem>
					</ChangeUserRoleModal>
				)}
			</MenuList>
		</Menu>
	)
}
