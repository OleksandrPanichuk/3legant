import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ACCESS_TOKEN_SECRET, TOKENS } from "@/shared/constants";
import { ExtractJwt } from "passport-jwt";
import { TypeTokenDecoded } from "@/shared/types";
import { PrismaService } from "../prisma";
import { Reflector } from "@nestjs/core";
import { UserRole } from "@prisma/client";
import { ROLES_METADATA_KEY } from "../decorators";



@Injectable()
export class RolesGuard implements CanActivate {
   
    constructor(private jwtService: JwtService, private prisma: PrismaService, private reflector:Reflector) {
        
    }

    async canActivate(context: ExecutionContext):  Promise<boolean> {

        const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_METADATA_KEY, [context.getHandler(), context.getClass()])
        
        if(!roles?.length) {
            return true
        }

        const request = context.switchToHttp().getRequest<Request>()
        const token  = request.cookies[TOKENS.ACCESS_TOKEN] ?? ExtractJwt.fromAuthHeaderAsBearerToken()(request) as string | undefined
        
        if(!token) {
            throw new UnauthorizedException('Unauthorized')
        }

        const decodedToken = this.jwtService.verify<TypeTokenDecoded>(token, {secret: ACCESS_TOKEN_SECRET})
        

        if(!decodedToken.sub) {
            return false
        } 


        const user = await this.prisma.user.findUnique({
			where: {
				id: decodedToken.sub
			},
            select: {
                role:true
            }
		})

        if(roles.includes(user.role)) {
            return true
        }

        return false
    }
}