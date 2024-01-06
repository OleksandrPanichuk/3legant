import { CustomerActions } from '@/components/screens/customers'
import { TypeUserWithAvatar } from '@/shared/types'
import { Avatar, Badge, Button, Center } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { roles } from './CustomersTable.data'

export const columns: ColumnDef<TypeUserWithAvatar>[] = [
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
		},
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
		},
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
		},
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
		},
	},
	{
		accessorKey: 'role',
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
					variant={'ghost'}
					colorScheme='gray'
				>
					Role
					<ArrowUpDown />
				</Button>
			)
		},
		cell: ({ row }) => {
			const { role } = row.original
			const roleData = roles[role]

			return (
				<Center>
					<Badge colorScheme={roleData.colorScheme}>{roleData.text}</Badge>
				</Center>
			)
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return <CustomerActions user={row.original} />
		},
	},
]
