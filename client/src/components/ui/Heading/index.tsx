import { cn } from '@/lib'
import styles from './Heading.module.scss'
import { forwardRef } from 'react'

export interface IHeadingProps
	extends React.HTMLAttributes<HTMLHeadingElement> {
	variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'hero'
}

export const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>(
	({ className, variant = 'h3', ...props }, ref) => {
		const Comp =
			variant === 'h7' || variant === 'hero'
				? variant === 'h7'
					? 'h6'
					: 'h1'
				: variant
		return (
			<Comp
				{...props}
				className={cn(styles.heading, styles[variant])}
				ref={ref}
			/>
		)
	}
)

Heading.displayName = 'Heading'
