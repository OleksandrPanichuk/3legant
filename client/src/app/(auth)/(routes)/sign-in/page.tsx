'use client'

import {
	Heading,
	Typography,
	Form,
	FormField,
	FormItem,
	FormControl,
	Input,
	FormMessage,
	Button
} from '@/components/ui'
import { signInSchema, SignInInput } from '@/services'
import { Routes } from '@/shared/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import styles from './page.module.scss'
import { useSignIn } from '@/services'
import { Loader2 as LoaderIcon } from 'lucide-react'

const SignInPage = () => {
	const form = useForm<SignInInput>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			password: '',
			emailOrUsername: ''
		},
		mode: 'onBlur'
	})

	const { isPending, mutate: signIn } = useSignIn()

	const onSubmit = (values: SignInInput) => signIn(values)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<Heading>Sign In</Heading>
				<Typography weight={400}>
					Don’t have an account yet?{' '}
					<Link className={styles['sign-up']} prefetch href={Routes.SIGN_UP}>
						Sign Up
					</Link>
				</Typography>
				<FormField
					control={form.control}
					name={'emailOrUsername'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									placeholder="Your username or email address"
								/>
							</FormControl>
							<FormMessage className={styles['username-or-email-message']} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'password'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									placeholder="Password"
									type={'password'}
								/>
							</FormControl>
							<div className={styles['password-bottom']}>
								<FormMessage />
								<div />
								<Link href={Routes.RESET_PASSWORD}>
									<Typography
										size={'sm'}
										fontColor={'neutral-700'}
										weight={600}
										as="span"
									>
										Forgot Password?
									</Typography>
								</Link>
							</div>
						</FormItem>
					)}
				/>
				<Button
					disabled={!form.formState.isValid || isPending}
					className={styles['submit-button']}
				>
					{isPending && <LoaderIcon className="animate-spin" />}
					Sign In
				</Button>
			</form>
		</Form>
	)
}

export default SignInPage
