import type { Meta, StoryObj } from "@storybook/react"
import { Typography } from "."



const meta = {
	component:Typography,
	title:'UI/Typography'
} satisfies Meta<typeof Typography>
export default meta

type Story = StoryObj<typeof Typography>

export const XL3:Story = {
	args: {
		size:"3xl",
		children: "Lorem ipsum. (3xl)"
	}
}

export const XL2:Story = {
	args: {
		size:"2xl",
		children: "Lorem ipsum. (2xl)"
	}
}

export const XL:Story = {
	args: {
		size:"xl",
		children: "Lorem ipsum. (xl)"
	}
}


export const LG:Story = {
	args: {
		size:"lg",
		children: "Lorem ipsum. (lg)"
	}
}

export const Base:Story = {
	args: {
		size:"base",
		children: "Lorem ipsum. (base)"
	}
}

export const SM:Story = {
	args: {
		size:"sm",
		children: "Lorem ipsum. (sm)"
	}
}

export const XS:Story = {
	args: {
		size:"xs",
		children: "Lorem ipsum. (xs)"
	}
}