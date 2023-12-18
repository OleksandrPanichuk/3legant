import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { CurrentUser, AccessTokenGuard } from '@/common';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Get('me')
    currentUser(@CurrentUser() user?:UserEntity) {
      return user
    }
}
