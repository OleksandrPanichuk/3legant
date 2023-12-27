
import { cacheConfig } from '@/config'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { APP_GUARD } from '@nestjs/core'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { ProductsModule } from './products/products.module'
import { UserModule } from './user/user.module'
import { StorageModule } from './common/storage'
import { RolesGuard } from './common/guard'
import { PrismaModule } from './common/prisma'
import { MailerModule } from './common/mailer'
import { MulterModule } from '@nestjs/platform-express'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MulterModule.register({
			limits: {
				fileSize: 1_048_576 * 10
			}
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
