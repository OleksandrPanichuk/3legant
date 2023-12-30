import { cacheConfig } from '@/config'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { APP_GUARD } from '@nestjs/core'
import { MulterModule } from '@nestjs/platform-express'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { RolesGuard } from './common/guard'
import { MailerModule } from './common/mailer'
import { PrismaModule } from './common/prisma'
import { StorageModule } from './common/storage'
import { ProductsModule } from './products/products.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MulterModule.register({
			limits: {
				fileSize: 1_048_576 * 10,
			},
		}),
		CacheModule.register(cacheConfig),
		PrismaModule,
		MailerModule,
		AuthModule,
		UserModule,
		CategoriesModule,
		ProductsModule,
		StorageModule,
	],
	providers: [
		// {
		// 	provide: APP_FILTER,
		// 	useClass: UnauthorizedExceptionFilter
		// },
		{
			provide: APP_GUARD,
			useClass: RolesGuard,
		},
	],
})
export class AppModule {}
