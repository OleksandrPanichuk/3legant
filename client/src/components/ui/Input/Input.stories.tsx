import { Flex } from '@chakra-ui/react'
import { Meta } from '@storybook/react'
import { Input } from '.'

const meta = {
	component: Input,
	title: 'UI/Input',
} satisfies Meta<typeof Input>

export default meta

export const Basic = () => {
	return (
		<Flex justifyContent={'center'} marginTop='4rem'>
			<Input
				placeholder='Input something'
				style={{ maxWidth: '300px', width: '100%' }}
			/>
		</Flex>
	)
}

export const Password = () => {
	return (
		<Flex justifyContent={'center'} marginTop='4rem'>
			<Input
				type='password'
				placeholder='Input something'
				style={{ maxWidth: '300px', width: '100%' }}
			/>
		</Flex>
	)
}
