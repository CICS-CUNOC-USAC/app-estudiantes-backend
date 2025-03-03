import { Body, Controller, Get, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RedisService } from "./redis.service";

@ApiTags('Redis')
@Controller('redis')
export class RedisController {

    constructor(private readonly redisService: RedisService) {}

    @Post('generate-password-reset-hash')
    async generatePasswordResetHash(@Body(new ValidationPipe({ transform: true })) body: { email: string }) {
        return this.redisService.generatePasswordResetHash(body.email);
    }

    @Get('get-password-reset-hash')
    async getPasswordResetHash(@Query(new ValidationPipe({ transform: true })) body: { hash: string }) {
        return this.redisService.getPasswordResetHash(body.hash);
    }

}