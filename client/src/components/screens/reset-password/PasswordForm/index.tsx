'use client'

import { useForm } from 'react-hook-form'
import {
	IPasswordFormProps,
	TypeFormData,
	formSchema
} from './PasswordForm.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
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
import { useResetPassword } from '@/services'
import { Loader2 as LoaderIcon } from 'lucide-react'
import styles from './PasswordForm.module.scss'

export const PasswordForm = ({ code }: IPasswordFormProps) => {
	const form = useForm<TypeFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			password: '',
			confirmPassword: ''
		}
	})
	const { mutate: reset, isPending } = useResetPassword()
	const onSubmit = (values: TypeFormData) => {
		if (values.password !== values.confirmPassword) {
			return toast.error("Passwords don't match")
		}
		reset({
			code,
			password: values.password
		})
	}
	return (
		<Form {...form}>
			<form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
				<Heading variant="h4">Reset Password</Heading>
				<Typography weight={400}>Enter new password</Typography>
				<FormField
					control={form.control}
					name={'password'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									aria-disabled={isPending}
									placeholder="New password"
									type={'password'}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'confirmPassword'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									aria-disabled={isPending}
									placeholder="Confirm your password"
									type={'password'}
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
			</form>
		</Form>
	)
}
