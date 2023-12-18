import { REDIS_URL } from '@/shared/constants'
import { Redis as RedisPrimary } from 'ioredis'

export type TypeRedis =  RedisPrimary
export class Redis {
	private static instance: RedisPrimary

	public static getInstance(): RedisPrimary {
		if (this.instance) {
			return this.instance
		}

		this.instance = new RedisPrimary(REDIS_URL)

		this.instance.on("connecting", () => console.log("REDIS CONNECTED"))

		this.instance.on('error', (err) => console.log('REDIS ERROR', err))

		return this.instance
	}
}