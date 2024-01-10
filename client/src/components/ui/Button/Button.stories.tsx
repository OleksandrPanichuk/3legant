import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '.'

const meta = {
	tags: ['autodocs'],
	title: 'UI/Button',
	component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
	args: {
		variant: 'default',
		children: 'Button',
	},
}

export const Secondary: Story = {
	args: 
	{
		variant:"secondary",
		children:"Button"
	}
}


export const Ghost: Story = {
	args: {
		variant:'ghost',
		children:"Button"
	}
}


export const Outlined: Story = {
	args: {
		variant: "outline",
		children:'Button'
	}
}