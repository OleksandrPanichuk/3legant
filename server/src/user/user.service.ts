import { PrismaService, generateErrorResponse, omit } from '@/common';
import { Injectable } from '@nestjs/common';
import { UserEntityWithAvatar } from './user.entity';
import { FindAllInput } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}


    public async findAll(dto: FindAllInput): Promise<UserEntityWithAvatar[]> {
        try {
            const users = await this.prisma.user.findMany({
                ...(dto.searchValue && {
                    where: {
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
                }),
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
            return users.map(user => omit(user, ['hash','hashedRt']))
        } catch (err) {
            throw generateErrorResponse(err)
        } 
    }
}
