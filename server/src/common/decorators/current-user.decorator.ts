import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "@prisma/client";
import { PrismaService, Redis, omit } from "@/common";
import { Request } from "express";
import { ACCESS_TOKEN_SECRET, TOKENS } from "@/shared/constants";
import { JwtService } from "@nestjs/jwt";
import {  TypeTokenDecoded } from "@/shared/types";
import { UserEntity } from "@/user/user.entity";
import { ExtractJwt } from "passport-jwt";


const prisma = new PrismaService()
const redis = Redis.getInstance()
const jwtService = new JwtService()


const omittedFields: (keyof User)[] = ['hash', 'hashedRt']

export const CurrentUser = createParamDecorator(
    async <T extends keyof User>(data: T | undefined, context:ExecutionContext): Promise<UserEntity | undefined | User[T]> => {
        const request = context.switchToHttp().getRequest<Request>()

        const token  = request.cookies[TOKENS.ACCESS_TOKEN] ?? ExtractJwt.fromAuthHeaderAsBearerToken()(request) as string | undefined
        if(!token) {
            return
        }

        const decodedToken = jwtService.verify<TypeTokenDecoded>(token, {secret: ACCESS_TOKEN_SECRET})
        

        if(!decodedToken.sub) {
            return 
        } 

        const cachedUser = JSON.parse(await redis.get(`user:${decodedToken.sub}`)) as User | undefined


        if(cachedUser?.id && !omittedFields.includes(data)) {
            if(data) {
                return cachedUser[data]
            }
            return cachedUser
        }

        const dbUser = await prisma.user.findUnique({
			where: {
				id: decodedToken.sub
			}
		})
        
        
        if(!dbUser) {
            return
        }

        if(!omittedFields.includes(data)) {
            await redis.set(`user:${decodedToken.sub}`, JSON.stringify(omit({...dbUser}, omittedFields)), 'EX', 7200)
        }


        if(data) {
            return dbUser[data]
        }
       
        return omit(dbUser, omittedFields)
    }
)