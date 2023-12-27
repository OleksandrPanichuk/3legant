
import { EditCategoryModal } from '@/components/modals'
import { TypeCategory } from '@/shared/types'
import {
	Button,
	Center,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
} from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, Edit, MoreHorizontal, Trash } from 'lucide-react'

export const getColumns = (
	page: number,
	take: number
): ColumnDef<TypeCategory>[] => {
	return [
		{
			id: 'index',
			cell: ({ row }) => row.index + 1 + page * take,
			header: ({ column }) => {
				return (
					<Button
						onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
						variant={'ghost'}
						colorScheme={'gray'}
					>
						№
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
						Category name
						<ArrowUpDown />
					</Button>
				)
			},
		},
		{
			id: 'actions',
			cell: function Actions({ row }) {
				

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
							<EditCategoryModal data={row.original}>
							<MenuItem
								display={'flex'}
								gap={'8px'}
								alignItems={'center'}
							>
								<Edit />
								Edit Category
							</MenuItem>
							</EditCategoryModal>
							{/*  TODO: delete category functionality */}
							<MenuItem display={'flex'} gap={'8px'} alignItems={'center'}>
								<Trash />
								Delete Category
							</MenuItem>
						</MenuList>
					</Menu>
				)
			},
		},
	]
}
