import { IsEmail, IsUrl } from "class-validator";



export class SendResetPasswordLinkInput {

    @IsUrl()
    readonly link: string

    @IsEmail()
    readonly email:string
}