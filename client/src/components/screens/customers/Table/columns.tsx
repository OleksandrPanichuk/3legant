import { Routes } from '@/shared/constants'
import { TypeUser } from '@/shared/types'
import {
	Avatar,
	Button,
	Center,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList
} from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal, UserCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const columns: ColumnDef<TypeUser>[] = [
	{
		accessorKey: 'avatar',
		header: () => {
			return (
				<Center>
					<Button variant={'ghost'} colorScheme={'gray'}>
						Avatar
					</Button>
				</Center>
			)
		},
		cell: ({ row }) => {
			const { name, avatar } = row.original
			return (
				<Center>
					<Avatar
						width={'2.5rem'}
						height={'2.5rem'}
						name={name}
						src={avatar?.key}
					/>
				</Center>
			)
		}
	},
	{
		accessorKey: 'email',
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					variant={'ghost'}
					colorScheme={'gray'}
				>
					Email
					<ArrowUpDown />
				</Button>
			)
		}
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					variant={'ghost'}
					colorScheme={'gray'}
				>
					Name
					<ArrowUpDown />
				</Button>
			)
		}
	},
	{
		accessorKey: 'username',
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					variant={'ghost'}
					colorScheme={'gray'}
				>
					Username
					<ArrowUpDown />
				</Button>
			)
		}
	},
	{
		id: 'actions',
		cell: function Actions({ row }) {
			const { id } = row.original
			const router = useRouter()

			return (
				<Menu placement="bottom-end">
					<MenuButton
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
						as={IconButton}
						aria-label="actions"
					>
						<Center>
							<MoreHorizontal />
						</Center>
					</MenuButton>
					<MenuList padding={'4px'}>
						<MenuItem
							onClick={() => router.push(`${Routes.PROFILE}/${id}`)}
							icon={<UserCircle />}
						>
							Visit profile
						</MenuItem>
					</MenuList>
				</Menu>
			)
		}
	}
]
