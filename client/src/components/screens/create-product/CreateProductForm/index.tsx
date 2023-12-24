'use client'

import {
	CategoriesSelect,
	DescriptionTextarea,
	DetailsTextarea,
	HeightInput,
	LengthInput,
	MeasurementInput,
	NumberInput,
	PreviewImageDropzone,
	PriceInput,
	ProductNameInput,
	WeightInput,
	WidthInput
} from '@/components/screens/create-product'
import { Form } from '@/components/ui'
import { CreateProductInput, createProductSchema } from '@/services'
import { Card, CardBody } from '@chakra-ui/card'
import { Button, Flex, Grid } from '@chakra-ui/react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import styles from './CreateProductForm.module.scss'

export const CreateProductForm = () => {
	const form = useForm<CreateProductInput>({
		resolver: zodResolver(createProductSchema)
	})
	const { handleSubmit } = form
	const onSubmit = (values: CreateProductInput) => {
		console.log(values)
	}

	return (
		<Card>
			<CardBody>
				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ProductNameInput />
						<DescriptionTextarea />
						<CategoriesSelect />
						<PreviewImageDropzone />
						<Flex className={styles['price-measurements']}>
							<PriceInput />
							<MeasurementInput />
						</Flex>
						<DetailsTextarea />
						<Grid>
							<WidthInput />
							<HeightInput />
							<LengthInput />
							<WeightInput />
							<NumberInput
								label={'Packages'}
								name={'packages'}
								format={(v) => v}
								parse={(v) => v}
							/>
						</Grid>

						<Button colorScheme={'blue'} variant={'ghost'} type={'submit'}>
							Submit


							
						</Button>
					</form>
				</Form>
			</CardBody>
		</Card>
	)
}
