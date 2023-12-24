import { Controller, Get, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntityWithAvatar } from './user.entity';
import { CurrentUser, AccessTokenGuard, Roles } from '@/common';
import { FindAllInput, FindAllResponse } from './dto';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  currentUser(@CurrentUser() user?:UserEntityWithAvatar) {
      return user
  }


  @Roles(['ADMIN','MANAGER'])
  @Get('')
  @HttpCode(HttpStatus.OK)
  findAll(@Query() query: FindAllInput): Promise<FindAllResponse> {
    return this.userService.findAll(query);
  }
}
