import { REDIS_URL } from '@/shared/constants';
import {CacheModuleOptions} from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store';

export const cacheConfig: CacheModuleOptions = {
    isGlobal:true,
	ttl:7200,
	url: REDIS_URL	,
    store: redisStore
}