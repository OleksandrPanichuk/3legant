import { EnvKeys } from '@/shared/constants'
import { ConfigService } from '@nestjs/config'
import {MailerOptions} from '@nestjs-modules/mailer'
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'


export const getMailerConfig = async (config: ConfigService): Promise<MailerOptions> => {
	return {
		transport: {
			host: config.get<string>(EnvKeys.MAIL_HOST),
			secure: true,
			port: config.get<number>(EnvKeys.MAIL_PORT),
			auth: {
				user: config.get<string>(EnvKeys.MAIL_USER),
				pass: config.get<string>(EnvKeys.MAIL_PASSWORD)
			}
		},
		defaults: {
			from: `"No Reply" <${config.get(EnvKeys.MAIL_FROM)}>`
		},
		template: {
			adapter: new HandlebarsAdapter,
			options: {
                strict:false
            }
		}
	}
}