'use client'

import {
	CategoriesSelect,
	PackagesInput,
	PreviewImageDropzone,
	PriceInput,
} from '@/components/screens/create-product'
import { Button, Form, FormInputChakra, FormTextarea } from '@/components/ui'
import {
	CreateProductInput,
	createProductSchema,
} from '@/services'
import { Card, CardBody } from '@chakra-ui/card'
import { Flex, Grid } from '@chakra-ui/react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import styles from './CreateProductForm.module.scss'
import { useCreateProduct } from './CreateProductForm.hooks'

export const CreateProductForm = () => {
	const form = useForm<CreateProductInput>({
		resolver: zodResolver(createProductSchema),
	})
	const { handleSubmit, control } = form

	const { mutate: createProduct, isPending } = useCreateProduct()

	const onSubmit = (values: CreateProductInput) => createProduct(values)

	return (
		<Card>
			<CardBody>
				<Form {...form}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<FormInputChakra
							control={control}
							name={'title'}
							label={'Name'}
							isDisabled={isPending}
						/>
						<FormTextarea
							control={control}
							name={'description'}
							label='Description'
							maxHeight={'12.5rem'}
							isDisabled={isPending}
						/>
						<CategoriesSelect disabled={isPending} />
						<PreviewImageDropzone disabled={isPending} />
						<Flex className={styles['price-measurements']}>
							<PriceInput disabled={isPending} />
							<FormInputChakra
								control={control}
								placeholder='17 1/2x20 5/8 "'
								name={'measurements'}
								label={'Measurements'}
								isDisabled={isPending}
							/>
						</Flex>
						<FormTextarea
							name={'details'}
							control={control}
							label='Product details'
							maxHeight={'12.5rem'}
							isDisabled={isPending}
						/>
						<Grid className={styles.properties}>
							<FormInputChakra
								control={control}
								name='weight'
								label={'Weight'}
								isDisabled={isPending}
							/>
							<FormInputChakra
								control={control}
								name='length'
								label={'Length'}
								isDisabled={isPending}
							/>
							<FormInputChakra
								control={control}
								name='width'
								label={'Width'}
								isDisabled={isPending}
							/>
							<FormInputChakra
								control={control}
								name='height'
								label={'Height'}
								isDisabled={isPending}
							/>
							<PackagesInput disabled={isPending} />
						</Grid>

						<Flex className={styles.submit}>
							<Button disabled={isPending} type={'submit'}>
								{isPending && <Loader2 className='animate-spin' />}
								Submit
							</Button>
						</Flex>
					</form>
				</Form>
			</CardBody>
		</Card>
	)
}
