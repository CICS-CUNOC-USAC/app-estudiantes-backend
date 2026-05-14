import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MetricsService } from './metrics.service';
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

@Injectable()
export class HttpMetricsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly metrics: MetricsService,
  ) {
    this.registerInterceptors();
  }

  private registerInterceptors(): void {
    const axios = this.httpService.axiosRef;

    axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      (config as any)._metricsStart = Date.now();
      return config;
    });

    axios.interceptors.response.use(
      (response: AxiosResponse) => {
        this.record(response.config, String(response.status));
        return response;
      },
      (error: any) => {
        const status = error.response?.status
          ? String(error.response.status)
          : 'error';
        this.record(error.config, status);
        return Promise.reject(error);
      },
    );
  }

  private record(config: any, status: string): void {
    const upstream = this.extractUpstream(config?.url ?? '');
    const method = (config?.method ?? 'unknown').toUpperCase();
    const duration = config?._metricsStart
      ? (Date.now() - config._metricsStart) / 1000
      : 0;

    const labels = { method, upstream, status };
    this.metrics.externalHttpRequestsTotal.inc(labels);
    this.metrics.externalHttpDurationSeconds.observe(labels, duration);
  }

  private extractUpstream(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return 'unknown';
    }
  }
}
