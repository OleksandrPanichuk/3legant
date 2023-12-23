'use client'
import { flexRender } from '@tanstack/react-table'
import { TypeUser } from '@/shared/types'
import {
	Table,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr
} from '@chakra-ui/react'

import { columns } from './CustomersTable.columns'
import { useCustomersTable } from './CustomersTable.hooks'
import styles from './CustomersTable.module.scss'

const CustomersTable = ({ data }: { data: TypeUser[] }) => {
	const table = useCustomersTable(data)
	return (
		<TableContainer className={styles.container}>
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
							<Tr key={row.id} data-state={row.getIsSelected() && 'selected'}>
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

export { columns, CustomersTable, useCustomersTable }
