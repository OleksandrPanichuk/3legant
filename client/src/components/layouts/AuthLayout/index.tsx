"use client"
import { Logo } from '@/components/common'
import { Images, Routes } from '@/shared/constants'
import Image from 'next/image'
import { PropsWithChildren } from 'react'
import styles from './AuthLayout.module.scss'
import { Container } from '@/components/ui'
import { useAuth } from '@/components/providers'
import { redirect } from 'next/navigation'

export const AuthLayout = ({ children }: PropsWithChildren) => {
	const {user} = useAuth()
	if(user) return redirect(Routes.ROOT)
	return (
		<main className={styles.wrapper}>
			<div className={styles.image}>
				<Logo className={styles.logo} />
				<Image
					fill
					objectFit="contain"
					src={Images.AUTH_IMAGE}
					alt={'Thumbnail image'}
				/>
			</div>
			<Container className={styles.content}>{children}</Container>
		</main>
	)
}
