import { IIconProps } from '@/shared/types'

export const EyeIcon = ({
	height = '24px',
	width = '24px',
	className,
	stroke = '#6C7275'
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
			<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	)
}
