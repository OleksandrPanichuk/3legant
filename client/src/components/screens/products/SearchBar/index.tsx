'use client'

import { useProductsContext } from '@/components/screens/products'

import { Input } from '@chakra-ui/input'

import styles from './SearchBar.module.scss'




export const SearchBar = () => {
	const {searchValue, setSearchValue} = useProductsContext()
	return (
		<Input
			className={styles.input}
			placeholder='Search products'
			value={searchValue}
			onChange={e => 
				setSearchValue(e.target.value)
			}
			focusBorderColor='transparent'
			
		/>
	)
}
