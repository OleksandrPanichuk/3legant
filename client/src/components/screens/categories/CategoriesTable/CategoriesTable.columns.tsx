import { CategoryActions } from '@/components/screens/categories'
import { TypeCategory } from '@/shared/types'
import { Button } from '@chakra-ui/react'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'

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
			cell: ({ row }) => {
				return <CategoryActions category={row.original} />
			},
		},
	]
}
