import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { cacheConfig } from '@/config';
import { PrismaModule, UnauthorizedExceptionFilter, MailerModule } from '@/common';


import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
			isGlobal: true,
		}),
		CacheModule.register(cacheConfig),
		PrismaModule,
		MailerModule,
		AuthModule,
		UserModule,
  ],
  providers: [
	{
		provide: APP_FILTER,
		useClass: UnauthorizedExceptionFilter
	}
  ]
})
export class AppModule {}
