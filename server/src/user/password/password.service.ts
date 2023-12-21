import { MailerService, PrismaService, Redis, TypeRedis, bcrypt, generateErrorResponse } from '@/common';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ResetPasswordInput, SendResetPasswordLinkInput } from './dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PasswordService {
    private readonly redis:TypeRedis
    constructor(private mailer:MailerService, private prisma: PrismaService) {
        this.redis = Redis.getInstance()
    }
    

    public async sendResetPasswordLink(input: SendResetPasswordLinkInput) {
        try {

            const user = await this.prisma.user.findUnique({
                where: {
                    email:input.email
                }
            })
            if(!user) throw new NotFoundException("We cannot find your email.")

            const code = uuid()

            const link = `${input.link}?code=${code}`

           
            await this.redis.set(`reset-password-code:${code}`, JSON.stringify({
                code,
                email:user.email
            }),'EX',600)

            await this.mailer.sendResetPasswordLink(link, user)

            return 'Please check your email address'
        } catch (err) {
            throw generateErrorResponse(err)
        }
    }

    public async verifyResetPasswordCode(code:string) {
        try {   
            const changePasswordString = await this.redis.get(`reset-password-code:${code}`)
            if(!changePasswordString) {
                return false
            }
            return true
        } catch(err) {
            throw generateErrorResponse(err)
        }
    }
    public async resetPassword(input:ResetPasswordInput): Promise<string> {
        try {
            const forgetPasswordString = await this.redis.get(`reset-password-code:${input.code}`)
            if(!forgetPasswordString) throw new BadRequestException('Please, try again')

            const forgetPasswordObject = JSON.parse(forgetPasswordString) as {
                email:string,
                code:string
            }


            const user = await this.prisma.user.findUnique({
                where: {
                    email:forgetPasswordObject.email
                }
            })

            if(!user) {
                throw new NotFoundException("User not found")
            }
            const hash = await bcrypt.hash(input.password)
    
            await this.prisma.user.update({
                where: {
                    id:user.id
                },
                data: {
                    hash
                }
            })

            await this.redis.del(`reset-password-code:${input.code}`)

            return "Password updated"
           } catch (err) {
            throw generateErrorResponse(err)
           }
    }
}