import { Module } from "@nestjs/common";
import { ConsumeService } from "./consume-service.service";
import { HttpModule } from "@nestjs/axios";

@Module({
    controllers: [],
    providers: [ConsumeService],
    imports: [HttpModule],
    exports: [ConsumeService]
})

export class ConsumeServiceModule{}