'use client'
import { TypeUser } from '@/shared/types'
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { flexRender } from '@tanstack/react-table'

import { useTable } from '@/hooks'
import { columns } from './CustomersTable.columns'
import styles from './CustomersTable.module.scss'
import { cn } from '@/lib'

const CustomersTable = ({ data }: { data: TypeUser[] }) => {
	const table = useTable(data, columns)
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

export { CustomersTable, columns }
