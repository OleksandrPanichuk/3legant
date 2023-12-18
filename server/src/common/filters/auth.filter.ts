import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    UnauthorizedException
} from '@nestjs/common';
import axios, { AxiosError } from "axios";
import { Request, Response } from 'express';
import { AuthService } from "@/auth/auth.service";
import { BACKEND_URL, TOKENS } from "@/shared/constants";
import { Reflector } from '@nestjs/core';



@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    constructor(private authService: AuthService, private reflector: Reflector) { }
    async catch(exception: HttpException, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR
        try {
                const rt = request?.cookies?.[TOKENS.REFRESH_TOKEN];

                if (!rt) return res.status(401).send({
                    message: "Unauthorized",
                    cause: "Refresh token is not provided",
                    status: 401
                })

                const tokens = await this.authService.refreshToken(rt);

                const { data,status,headers} = await axios(`${BACKEND_URL}${request.url}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${tokens.accessToken}`,
                        Cookie: request.cookies
                    },
                    method: request.method,
                    data: request.body,
                });



                return res.status(status)
                .cookie(TOKENS.ACCESS_TOKEN, tokens.accessToken, {
                    httpOnly: false,
                        maxAge: 1000 * 60 * 30,
                    })
                    .header(headers)
                    .send(data);
            } catch (err) {
                if (err instanceof AxiosError) {
                    return res.status(err.response?.status ?? 500).send(err.response?.data ?? 'Internal Server Error')
                }
                return res.status(status).send(err);
            }
        
    }
}