'use client'

import { useForm } from 'react-hook-form'
import { TypeFormData, formSchema } from './EmailForm.types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Heading,
	Input,
	Typography
} from '@/components/ui'
import { Routes } from '@/shared/constants'
import Link from 'next/link'
import {
	ChevronLeft as ChevronLeftIcon,
	Loader2 as LoaderIcon
} from 'lucide-react'
import { cn } from '@/lib'
import { useSendResetPasswordLink } from '@/services'
import styles from './EmailForm.module.scss'

export const EmailForm = () => {
	const form = useForm<TypeFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: ''
		}
	})
	const { mutate: send, isPending } = useSendResetPasswordLink()
	const onSubmit = (values: TypeFormData) => send(values.email)

	return (
		<Form {...form}>
			<form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
				<Heading>Forgot Password?</Heading>
				<Typography weight={400}>
					Enter your email and we&apos;ll send you a link to reset your password
				</Typography>
				<FormField
					control={form.control}
					name={'email'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									aria-disabled={isPending}
									placeholder={'Email address '}
									type={'email'}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={isPending || !form.formState.isValid}
					aria-disabled={isPending || !form.formState.isValid}
					className={styles['button-submit']}
					type={'submit'}
				>
					{isPending && <LoaderIcon className="animate-spin" />}
					Submit
				</Button>
				<div className={styles['button-login']}>
					<Link
						className={cn(styles['button-login__link'], 'text-sm')}
						href={Routes.SIGN_IN}
					>
						<ChevronLeftIcon />
						<span>Back to Login</span>
					</Link>
				</div>
			</form>
		</Form>
	)
}
