
import { DATABASE_URL } from "@/shared/constants";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { } from "@nestjs/config";
import {PrismaClient}from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({
            datasources: {
                db: {
                    url: DATABASE_URL
                },
            },
        });
    }

    async onModuleInit() {
        await this.$connect()
    }
    async onModuleDestroy() {
        await this.$disconnect()
    }
}