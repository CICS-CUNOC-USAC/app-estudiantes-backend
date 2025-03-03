import { Body, Controller, Delete, Get, Param, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RedisService } from "./redis.service";
import { SaveDatasetDto } from "./dto/save-dataset.dto";
import { GetDatasetDto } from "./dto/get-dataset.dto";
import { DeleteDatasetDto } from "./dto/delete-dataset.dto";

@ApiTags('Redis')
@Controller('redis')
export class RedisController {

    constructor(private readonly redisService: RedisService) {}

    @Post('dataset')
    async createDataset(@Body(new ValidationPipe({ transform: true })) body: SaveDatasetDto) {
        return this.redisService.saveDataset(body);
    }

    @Get('dataset')
    async getDataset(@Query(new ValidationPipe({ transform: true })) query: GetDatasetDto) {
        return this.redisService.getDataset(query);
    }

    @Delete('dataset')
    async deleteDataset(@Body(new ValidationPipe({ transform: true })) body: DeleteDatasetDto) {
        return this.redisService.deleteDataset(body);
    }

}