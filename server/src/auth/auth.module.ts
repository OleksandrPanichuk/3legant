import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt'
import { ACCESS_TOKEN_SECRET } from '@/shared/constants';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';


@Module({
  imports: [JwtModule.register({
    global: true,
			secret: ACCESS_TOKEN_SECRET,
			signOptions: {
				expiresIn: '30min',
			}
  })],
  providers: [AuthService, AccessTokenStrategy ,RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
