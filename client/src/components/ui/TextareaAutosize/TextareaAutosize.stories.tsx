import { Flex } from '@chakra-ui/react'
import type { Meta } from '@storybook/react'
import { TextareaAutosize } from '@/components/ui'

export default {
	component: TextareaAutosize,
	title: 'UI/TextareaAutosize',
} satisfies Meta<typeof TextareaAutosize>

export const Basic = () => {
	return (
		<Flex justifyContent={'center'} marginTop={'4rem'}>
			<TextareaAutosize border={'solid 1px black'} borderRadius='8px' padding={'8px'} maxWidth={'300px'} width={'100%'} />
		</Flex>
	)
}
