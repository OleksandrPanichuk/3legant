import { cn } from '@/lib'
import { HTMLAttributes } from 'react'
import styles from './Logo.module.scss'
interface ILogoProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Logo = ({ className, ...props }: ILogoProps) => {
	return (
		<p {...props} className={cn(styles.logo, className)}>
			3legant.
		</p>
	)
}
