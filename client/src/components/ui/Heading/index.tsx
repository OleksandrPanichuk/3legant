import { cva, VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import styles from './Heading.module.scss'

export const headingVariants = cva(styles.heading, {
	variants: {
		size: {
			xs: styles['heading-xs'],
			sm: styles['heading-sm'],
			base: styles['heading-base'],
			md: styles['heading-md'],
			lg: styles['heading-lg'],
			xl: styles['heading-xl'],
			'2xl': styles['heading-2xl'],
			'3xl': styles['heading-3xl'],
		},
	},
	defaultVariants: {
		size: 'md',
	},
})

export interface IHeadingProps
	extends React.HTMLAttributes<HTMLHeadingElement>,
		VariantProps<typeof headingVariants> {
	as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Heading = forwardRef<HTMLHeadingElement, IHeadingProps>(
	({ className, as: Comp = 'h4', size, ...props }, ref) => {
		return (
			<Comp
				{...props}
				className={headingVariants({ size, className })}
				ref={ref}
			/>
		)
	}
)

Heading.displayName = 'Heading'
