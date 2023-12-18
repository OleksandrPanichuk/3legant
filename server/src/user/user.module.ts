import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PasswordModule } from './password/password.module';

@Module({
  imports:[PasswordModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
