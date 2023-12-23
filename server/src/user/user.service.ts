import { PrismaService, generateErrorResponse, omit } from '@/common';
import { Injectable } from '@nestjs/common';
import { FindAllInput, FindAllResponse } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}


    public async findAll(dto: FindAllInput): Promise<FindAllResponse> {
        try {

            const whereCondition: Prisma.UserWhereInput = dto.searchValue ? {
               
                    OR: [
                        {
                            username: {
                                contains: dto.searchValue,
                                mode:'insensitive'
                            }
                        },
                        {
                            name: {
                                contains: dto.searchValue,
                                mode:'insensitive'
                            }
                        },
                         {
                            email :{
                                contains: dto.searchValue,
                                mode:'insensitive'
                            }
                         }
                    ]
                }
            : {}
            const users = await this.prisma.user.findMany({
                where: whereCondition,
                include: {
                    avatar: {
                        select: {
                            url:true,
                            key:true
                        }
                    }
                },
                take:dto.take,
                skip:dto.skip
            })


            const count = await this.prisma.user.count({
                where: whereCondition
            })

            return {
                users:  users.map(user => omit(user, ['hash','hashedRt'])),
                count
            }
        } catch (err) {
            throw generateErrorResponse(err)
        } 
    }
}
