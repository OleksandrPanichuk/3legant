'use client'
import {
	ColumnFiltersState,
	SortingState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table'
import { columns } from './columns'
import { useState } from 'react'
import { TypeUser } from '@/shared/types'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

export const DataTable = ({ data }: { data: TypeUser[] }) => {
	const [sorting, setSorting] = useState<SortingState>([])
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters
		}
	})
	return (
		<TableContainer borderRadius={'0.5rem'}  border={'solid 1px #fafafa'} backgroundColor={'white'} margin={'0.5rem'} >
			<Table>
				<Thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<Th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
										  )}
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<Tr
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<Td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								))}
							</Tr>
						))
					) : (
						<Tr>
							<Td colSpan={columns.length} className="h-24 text-center">
								No results.
							</Td>
						</Tr>
					)}
				</Tbody>
			</Table>
		</TableContainer>
	)
}
