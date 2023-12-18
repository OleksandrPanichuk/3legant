import { Module } from '@nestjs/common'
import { MailerModule as MailerModulePrimary } from '@nestjs-modules/mailer'

import { MailerService } from './mailer.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getMailerConfig } from '@/config'


@Module({
	imports: [
		MailerModulePrimary.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMailerConfig,
			inject: [ConfigService]
		})
	],
	providers: [MailerService],
	exports: [MailerService]
})
export class MailerModule {}