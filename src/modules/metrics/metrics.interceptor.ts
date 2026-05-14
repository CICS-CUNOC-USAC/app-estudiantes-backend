import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap, finalize } from 'rxjs';
import { MetricsService } from './metrics.service';

@Injectable()
export class MetricsInterceptor implements NestInterceptor {
  constructor(private readonly metrics: MetricsService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = ctx.switchToHttp().getRequest();
    const endTimer = this.metrics.httpDurationSeconds.startTimer();

    this.metrics.activeConnectionsGauge.inc();

    return next.handle().pipe(
      tap(() => {
        const res = ctx.switchToHttp().getResponse();
        const labels = {
          method: req.method,
          route: req.route?.path ?? req.url,
          status: String(res.statusCode),
        };
        this.metrics.httpRequestsTotal.inc(labels);
        endTimer(labels);
      }),
      finalize(() => {
        this.metrics.activeConnectionsGauge.dec();
      }),
    );
  }
}
