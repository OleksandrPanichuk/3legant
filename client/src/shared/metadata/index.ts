import { APP_URL } from '@/shared/constants'
import { Metadata } from 'next'
import { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types'

export const baseMetadata = {
	title: '3legant',
	description: 'Furniture shop',
	applicationName: '3legant',
	url: APP_URL,
}

interface IProps {
	title?: string
	description?: string
	applicationName?: string
	url: string
	openGraphType?: OpenGraphType
}

export const constructMetadata = ({
	title,
	applicationName,
	description,
	url,
	openGraphType,
}: IProps = baseMetadata): Metadata => {
	return {
		title,
		description,
		applicationName,
		metadataBase: new URL(url),
		appLinks: {
			web: {
				url: url,
			},
		},
		openGraph: {
			title,
			description,
			url,
			type: openGraphType ?? 'website',
			siteName: applicationName,
		},
		twitter: {
			title,
			description,
		},
	}
}

export const constructRootMetadata = (): Metadata => {
	return {
		title: {
			default: baseMetadata.title,
			template: `%s | ${baseMetadata.title}`,
		},
		icons: [
			{
				rel: 'apple-touch-icon',
				url: '/favicon/apple-touch-icon.png',
				sizes: '180x180',
			},
			{
				rel: 'icon',
				type: 'image/png',
				url: '/favicon/favicon-32x32.png',
				sizes: '32x32',
			},
			{
				rel: 'icon',
				type: 'image/png',
				url: '/favicon/favicon-16x16.png',
				sizes: '16x16',
			},

			{
				rel: 'mask-icon',
				url: '/favicon/safari-pinned-tab.svg',
				color: '#5bbad5',
			},
		],
		description: baseMetadata.description,
		applicationName: baseMetadata.applicationName,
		metadataBase: new URL(baseMetadata.url),
		openGraph: {
			title: {
				default: baseMetadata.title,
				template: `%s | ${baseMetadata.title}`,
			},
			url: baseMetadata.url,
			description: baseMetadata.description,
			siteName: baseMetadata.applicationName,
			type: 'website',
		},
		twitter: {
			title: {
				default: baseMetadata.title,
				template: `%s | ${baseMetadata.title}`,
			},
			description: baseMetadata.description,
		},
	}
}
