import { Meta, StoryObj } from '@storybook/react'
import { Heading } from '.'

const meta = {
	component: Heading,
	title: 'UI/Heading',
} satisfies Meta<typeof Heading>

export default meta

type Story = StoryObj<typeof Heading>

export const XL3: Story = {
	args: {
		size: '3xl',
		as: 'h1',
		children: 'Heading 3XL',
	},
}

export const XL2: Story = {
	args: {
		size: '2xl',
		as: 'h1',
		children: 'Heading 2XL',
	},
}

export const XL: Story = {
	args: {
		size: 'xl',
		as: 'h2',
		children: 'Heading XL',
	},
}

export const LG: Story = {
	args: {
		size: 'lg',
		as: 'h3',
		children: 'Heading LG',
	},
}

export const MD: Story = {
	args: {
		size: 'md',
		as: 'h3',
		children: 'Heading MD',
	},
}

export const Base: Story = {
	args: {
		size: 'base',
		as: 'h4',
		children: 'Heading Base',
	},
}

export const SM: Story = {
	args: {
		size: 'sm',
		as: 'h5',
		children: 'Heading SM',
	},
}

export const XS: Story = {
	args: {
		size: 'xs',
		as: 'h6',
		children: 'Heading XS',
	},
}
