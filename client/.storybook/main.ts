import type { StorybookConfig } from '@storybook/nextjs'
import path from 'path'

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		'@storybook/addon-styling-webpack',
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},
	webpackFinal: async (config, { configType }) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve?.alias,
				'@': path.resolve(__dirname, '../src/'),
			}
		}
		return config
	},
	previewHead(config) {
		return `${config}
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Calligraffitti&family=Inter:wght@400;500;600;700&display=swap"
		rel="stylesheet">


	<style>
		:root {
			--font-inter: 'Inter',
				sans-serif;
		}
	</style>`
	},
}
export default config
