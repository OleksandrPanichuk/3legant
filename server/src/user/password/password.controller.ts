import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common';
import { ResetPasswordInput, SendResetPasswordLinkInput } from './dto';
import { PasswordService } from './password.service';

@Controller('user/password')
export class PasswordController {
    constructor(private passwordService:PasswordService){}


    @Post('reset/send')
    @HttpCode(HttpStatus.CREATED)
    sendPasswordResetLink(@Body() input:SendResetPasswordLinkInput  ) {
        return this.passwordService.sendResetPasswordLink(input)
    }


    @Patch('reset')
    @HttpCode(HttpStatus.OK)
    resetPassword(@Body() input: ResetPasswordInput) {
        return this.passwordService.resetPassword(input)
    }
   
}