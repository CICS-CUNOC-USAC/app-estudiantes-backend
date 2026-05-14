import { Module } from '@nestjs/common';
import { ConsumeService } from './consume-service.service';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  controllers: [],
  providers: [ConsumeService],
  imports: [MetricsModule],
  exports: [ConsumeService],
})
export class ConsumeServiceModule {}
