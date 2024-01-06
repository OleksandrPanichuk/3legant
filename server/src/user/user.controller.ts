import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch,
	Query,
	UseGuards,
	Param
} from '@nestjs/common'
import { UserEntity, UserEntityWithAvatar } from './user.entity'
import { UserService } from './user.service'

import { CurrentUser, Roles } from '@/common/decorators'
import { AccessTokenGuard } from '@/common/guard'
import { FindAllInput, FindAllResponse, UpdateRoleInput } from './dto'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AccessTokenGuard)
	@Get('me')
	@HttpCode(HttpStatus.OK)
	currentUser(@CurrentUser() user?: UserEntityWithAvatar) {
		return user
	}

	@Roles(['ADMIN', 'MANAGER'])
	@Get('')
	@HttpCode(HttpStatus.OK)
	findAll(@Query() query: FindAllInput): Promise<FindAllResponse> {
		return this.userService.findAll(query)
	}

	@Roles(['ADMIN'])
	@Patch('/:userId/role')
	updateRole(
		@Body() dto: UpdateRoleInput,
		@Param('userId') userId:string,
		@CurrentUser('id') currentUserId: string
	): Promise<UserEntity> {
		return this.userService.updateRole(dto, userId, currentUserId)
	}
}
