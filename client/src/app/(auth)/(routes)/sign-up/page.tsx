'use client'
import { signUpSchema, SignUpInput } from '@/services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
	Button,
	Checkbox,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Heading,
	Input,
	Typography
} from '@/components/ui'
import Link from 'next/link'
import { Routes } from '@/shared/constants'
import { useState } from 'react'
import { useSignUp } from '@/services'
import { Loader2 as LoaderIcon } from 'lucide-react'
	import styles from './page.module.scss'

const SignUpPage = () => {
	const [agreed, setAgreed] = useState<boolean>(false)
	const form = useForm<SignUpInput>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			username: '',
			email: '',
			password: ''
		},
		mode: 'onBlur'
	})

	const { isPending, mutate: signUp } = useSignUp()
	const onSubmit = (values: SignUpInput) => agreed && signUp(values)

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
				<Heading>Sign Up</Heading>
				<Typography weight={400}>
					Already have an account?{' '}
					<Link className={styles['sign-in']} prefetch href={Routes.SIGN_IN}>
						Sign In
					</Link>
				</Typography>
				<FormField
					control={form.control}
					name={'name'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									placeholder="Your name"
								/>
							</FormControl>
							<FormMessage className={styles['error-message']} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'username'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input {...field} disabled={isPending} placeholder="Username" />
							</FormControl>
							<FormMessage className={styles['error-message']} />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name={'email'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									disabled={isPending}
									type={'email'}
									placeholder="Email address"
								/>
							</FormControl>
							<FormMessage className={styles['error-message']} />
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
							<FormMessage className={styles['error-message']} />
						</FormItem>
					)}
				/>
				<div className={styles['privacy-policy']}>
					<Checkbox
						checked={agreed}
						disabled={isPending}
						onChange={(e) => setAgreed(e.target.checked)}
					/>
					<Typography weight={600}>
						I agree with{' '}
						<Link href={Routes.PRIVACY_POLICY}>Privacy Policy</Link> and{' '}
						<Link href={Routes.TERMS_OF_USE}>Terms of Use</Link>
					</Typography>
				</div>
				<Button
					disabled={!agreed || !form.formState.isValid || isPending}
					className={styles['submit-button']}
				>
					{isPending && <LoaderIcon className="animate-spin" />}
					Sign Up
				</Button>
			</form>
		</Form>
	)
}

export default SignUpPage
