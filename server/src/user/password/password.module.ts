

import { Module } from '@nestjs/common';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { MailerModule } from '@/common';


@Module({
    imports: [MailerModule],
    controllers: [PasswordController],
    providers: [PasswordService],
})
export class PasswordModule {};