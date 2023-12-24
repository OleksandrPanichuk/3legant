import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { cacheConfig } from '@/config';
import { PrismaModule, UnauthorizedExceptionFilter, MailerModule, RolesGuard } from '@/common';


import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';

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
		CategoriesModule,
  ],
  providers: [
	{
		provide: APP_FILTER,
		useClass: UnauthorizedExceptionFilter
	},
	{
		provide:APP_GUARD,
		useClass: RolesGuard
	}
  ],
})
export class AppModule {}
