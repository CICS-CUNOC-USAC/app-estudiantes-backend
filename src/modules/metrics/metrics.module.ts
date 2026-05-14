import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MetricsService } from './metrics.service';
import { MetricsInterceptor } from './metrics.interceptor';
import { HttpMetricsService } from './http-metrics.service';
import { MetricsExceptionFilter } from './metrics-exception.filter';

@Module({
  imports: [HttpModule],
  providers: [MetricsService, MetricsInterceptor, HttpMetricsService, MetricsExceptionFilter],
  exports: [MetricsService, MetricsInterceptor, HttpMetricsService, MetricsExceptionFilter, HttpModule],
})
export class MetricsModule {}
