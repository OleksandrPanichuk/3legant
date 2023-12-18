import { IIconProps } from '@/shared/types'

export const LoaderIcon = ({
	height = '24px',
	width = '24px',
	className,
	stroke = 'currentColor'
}: IIconProps) => {
	return (
		<svg
            className={className}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			stroke={stroke}
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 12a9 9 0 1 1-6.219-8.56" />
		</svg>
	)
}
