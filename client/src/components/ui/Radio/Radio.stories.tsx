import { Flex } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'
import { Radio } from '.'

const meta = {
	component: Radio,
	title: 'UI/Radio',
} satisfies Meta<typeof Radio>

export default meta

export const Checked = () => {
	return (
		<Flex as={'label'} alignItems={'center'} gap={'0.5rem'}>
			<Radio checked />
			Checked
		</Flex>
	)
}

export const Unchecked = () => {
	return (
		<Flex as={'label'} alignItems={'center'} gap={'0.5rem'}>
			<Radio checked={false} />
			Unchecked
		</Flex>
	)
}
