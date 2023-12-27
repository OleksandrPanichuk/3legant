import { MailerModule } from '@/common/mailer'
import { Module } from '@nestjs/common'
import { PasswordController } from './password.controller'
import { PasswordService } from './password.service'

@Module({
	imports: [MailerModule],
	controllers: [PasswordController],
	providers: [PasswordService],
})
export class PasswordModule {}
