import type {Meta, StoryObj} from '@storybook/react'
import { Checkbox } from '.'

const meta  = {
	component: Checkbox,
	title:'UI/Checkbox'

} satisfies Meta<typeof Checkbox>

export default meta


export const Unchecked = () => {
	return <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
		<Checkbox />
		Checkbox
	</label>
}


export const Checked = () => {
	return <label style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
		<Checkbox  checked />
		Checkbox
	</label>
}