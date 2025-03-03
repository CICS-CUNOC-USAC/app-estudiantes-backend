import { Inject, Injectable } from "@nestjs/common";
import { RedisRepository } from "./redis.repository";

@Injectable()
export class RedisService { 

    constructor(@Inject(RedisRepository) private readonly redisRepository: RedisRepository) {}

    async generatePasswordResetHash(email: string): Promise<string>{
        const hash = Math.random().toString(36).substring(7);
        console.log(hash);
        const SEVEN_DAYS_IN_SECONDS = 60 * 60 * 24 * 7;
        await this.redisRepository.set('PASS_RESET', hash, email, SEVEN_DAYS_IN_SECONDS);
        return hash;
    }

    async getPasswordResetHash(hash: string): Promise<string> {
        return this.redisRepository.get('PASS_RESET', hash);
    }
}