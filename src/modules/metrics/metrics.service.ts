import { Injectable } from '@nestjs/common';
import { Counter, Histogram, Gauge } from 'prom-client';

@Injectable()
export class MetricsService {
  readonly httpRequestsTotal = new Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status'],
  });

  readonly httpDurationSeconds = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status'],
    buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  });

  readonly activeConnectionsGauge = new Gauge({
    name: 'http_active_connections',
    help: 'Number of in-flight HTTP requests currently being processed',
  });

  readonly externalHttpRequestsTotal = new Counter({
    name: 'external_http_requests_total',
    help: 'Total outbound HTTP requests to external services',
    labelNames: ['method', 'upstream', 'status'],
  });

  readonly externalHttpDurationSeconds = new Histogram({
    name: 'external_http_duration_seconds',
    help: 'Outbound HTTP request duration in seconds',
    labelNames: ['method', 'upstream', 'status'],
    buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5],
  });

  readonly authAttemptsTotal = new Counter({
    name: 'auth_attempts_total',
    help: 'Total authentication attempts',
    labelNames: ['result'],
  });

  readonly guardRejectionsTotal = new Counter({
    name: 'guard_rejections_total',
    help: 'Total requests rejected by guards',
    labelNames: ['guard', 'reason'],
  });

  readonly unhandledExceptionsTotal = new Counter({
    name: 'unhandled_exceptions_total',
    help: 'Total unhandled exceptions caught by global exception filter',
    labelNames: ['exception_type'],
  });
}
