import { Inject, Injectable, NotFoundException, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisRepository implements OnModuleDestroy {

    constructor(
        @Inject('RedisClient') private readonly redisClient: Redis,
    ) {}

    async onModuleDestroy() {
        await this.redisClient.quit();
    }

    async get(prefix: string, key: string): Promise<string> { 
        const value = await this.redisClient.get(`${prefix}:${key}`);
        if(!value) throw new NotFoundException(`Llave de redis ${key} no encontrada o ha expirado`);
        return value;
    }

    async set(prefix: string, key: string, value: string, expiration: number): Promise<void> {
        await this.redisClient.set(`${prefix}:${key}`, value, 'EX', expiration);
    }

    async delete(prefix: string, key: string): Promise<void> {
        await this.redisClient.del(`${prefix}:${key}`);
    }
    
}