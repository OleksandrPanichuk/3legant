import { TypeSortOrder } from "@/shared/types"
import { Dispatch, SetStateAction } from "react"

export type SortByState = {
	order: TypeSortOrder
	name:'title' | 'price' | 'createdAt' 
}


export interface ISortBySelectProps {
	value: SortByState | undefined ,
	setValue: Dispatch<SetStateAction<SortByState | undefined>>
}


export type TypeSelectOption = {
	label: React.JSX.Element
	value: string
	sortOrder: SortByState['order']
	sortBy: SortByState['name']
}