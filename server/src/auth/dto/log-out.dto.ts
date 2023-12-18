import { IsOptional, IsUrl } from 'class-validator'

export class LogOutInput {
	@IsOptional()
	@IsUrl()
	readonly redirectUrl?: string
}