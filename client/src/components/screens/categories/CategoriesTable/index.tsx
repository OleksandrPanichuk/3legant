"use client"
import { useTable } from '@/hooks'
import { cn } from '@/lib'
import { TypeCategory } from '@/shared/types'
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table'
import { flexRender } from '@tanstack/react-table'
import { useMemo } from 'react'
import { getColumns } from './CategoriesTable.columns'
import styles from './CategoriesTable.module.scss'

interface ICategoriesTableProps {
	data: TypeCategory[]
	page:number
	take:number
}

const CategoriesTable = ({ data, page, take }: ICategoriesTableProps) => {
	const columns = useMemo(() => {
		return getColumns(page, take)
	},[page, take] )

	const table = useTable(data ,columns)
	return (
		<TableContainer className={cn(styles.container, 'table-scrollbar')}>
			<Table>
				<Thead>
					{table.getHeaderGroups().map(headerGroup => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
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
						table.getRowModel().rows.map(row => (
							<Tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map(cell => (
									<Td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								))}
							</Tr>
						))
					) : (
						<Tr>
							<Td colSpan={columns.length} className='h-24 text-center'>
								No results.
							</Td>
						</Tr>
					)}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export { CategoriesTable, getColumns }

