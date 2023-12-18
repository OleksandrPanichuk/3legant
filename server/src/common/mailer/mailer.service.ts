import { Injectable } from "@nestjs/common";
import {MailerService as MailerServicePrimary} from "@nestjs-modules/mailer"
import { UserEntity } from "@/user/user.entity";
import { join } from "path";
@Injectable()
export class MailerService {
    constructor(private mailer: MailerServicePrimary) {}


    async sendResetPasswordLink(link:string, user:UserEntity) {
        return await this.mailer.sendMail({
            context: {
                link,
                name: user.name
            },
            template: join(__dirname, '/templates/reset-password.template.hbs'),
            to:user.email,
            subject:'Reset password | Podium'
        })
    }
}