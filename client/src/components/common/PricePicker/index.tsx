'use client'

import { Button, Typography } from '@/components/ui'
import { cn } from '@/lib'
import { TypeProductPrice } from '@/services'
import {
	Checkbox,
	Flex,
	Popover,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	useDisclosure,
} from '@chakra-ui/react'
import { ChevronDown } from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction, memo } from 'react'
import { prices } from './PricePicker.data'
import styles from './PricePicker.module.scss'

interface IPricePickerProps {
	setValue: Dispatch<SetStateAction<TypeProductPrice[] | undefined>>
	value: TypeProductPrice[] | undefined
}

export const PricePicker = memo(({ value, setValue }: IPricePickerProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
			<PopoverTrigger>
				<Button
					animate={false}
					size={'sm'}
					className={cn(styles.trigger, isOpen && styles['trigger--open'])}
					variant='secondary'
				>
					{value?.length ? (
						<>
							{value.length} {value.length === 1 ? 'Price' : 'Prices'} Selected
						</>
					) : (
						<span>All Prices</span>
					)}
					<ChevronDown />
				</Button>
			</PopoverTrigger>
			<PopoverContent className={styles.content}>
				<PopoverCloseButton />
				<PopoverHeader>Price Offers</PopoverHeader>
				<PopoverBody as={'ul'} className={styles.list}>
					{prices.map(price => {
						const checked =
							typeof value === 'undefined' && !price.value
								? true
								: !!value?.some(
										item =>
											item.end === price.value?.end &&
											item.start === price.value?.start
									)
						const onCheck = (event: ChangeEvent<HTMLInputElement>) => {
							const checked = event.target.checked
							if (checked) {
								if (!price.value) {
									setValue(undefined)
									return
								}
								if (value) {
									setValue(prev => prev?.concat(price.value))
								} else {
									setValue([price.value])
								}

								return
							}

							if (!checked && price.value) {
								setValue(prev => {
									const filtered = prev?.filter(
										item =>
											item.start !== price.value.start &&
											item.end !== price.value.end
									)
									return filtered?.length === 0 ? undefined : filtered
								})
							}
						}

						return (
							<Flex key={price.id} className={styles.item} as={'li'}>
								<Checkbox
									className={styles.checkbox}
									onChange={onCheck}
									isChecked={checked}
								>
									<Typography
										className={cn(
											styles['label-text'],
											checked && styles['label-text--checked']
										)}
										as={'span'}
									>
										{price.label}
									</Typography>
								</Checkbox>
							</Flex>
						)
					})}
				</PopoverBody>
			</PopoverContent>
		</Popover>
	)
})

PricePicker.displayName = 'PricePicker'
