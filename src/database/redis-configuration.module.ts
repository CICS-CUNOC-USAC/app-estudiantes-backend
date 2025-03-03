import { FactoryProvider } from "@nestjs/common";
import Redis from "ioredis";

export const redisClientFactory: FactoryProvider<Redis> = {
    provide: 'RedisClient', 
    useFactory: () => {
        const redisinstance = new Redis({
            host: process.env.REDIS_HOST || '172.28.121.72',
            port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
            username: 'default'
        });

        redisinstance.on('error', e =>{ 
            throw new Error(`Error connecting to Redis: ${e}`)
        });

        return redisinstance;
    },
    inject: []
}