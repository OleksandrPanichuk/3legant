import { type VariantProps } from 'class-variance-authority'
import { createElement, ForwardedRef, forwardRef, ReactHTML } from 'react'
import { typographyVariants } from './Typography.variants'

export interface ITypographyProps<T extends keyof ReactHTML>
	extends React.HTMLAttributes<ReactHTML[T]>,
		VariantProps<typeof typographyVariants> {
	as?: keyof ReactHTML
}

const Typography = forwardRef(
	<T extends keyof ReactHTML>(
		{
			as: type = 'p',
			size,
			fontFamily,
			weight,
			className,
			fontColor,
			...props
		}: ITypographyProps<T>,
		ref: ForwardedRef<ReactHTML[T]>
	) => {
		const Comp = type as T
		return createElement(Comp, {
			...props,
			ref,
			className: typographyVariants({ fontFamily, weight,fontColor, size, className })
		})
	}
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
