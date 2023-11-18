import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const url: string = request.originalUrl;
    const method = request.method;
    let body = request.body;

    if (
      url === '/login' ||
      url === '/sign-up' ||
      url === '/staff/auth/login' ||
      (url === '/staff' && method === 'POST')
    ) {
      body = '****';
    }

    this.logger.log(`[REQUEST]: 
      URL: ${JSON.stringify(url)}
      BODY: ${JSON.stringify(body)},
      METHOD: ${JSON.stringify(method)}
      IP: ${JSON.stringify(request.ip)}
    `);

    response.on('close', () => {
      this.logger.log(`[RESPONSE]: 
        URL: ${JSON.stringify(url)}
        METHOD: ${JSON.stringify(method)}
        BODY: ${JSON.stringify(body)}
        RESPONSE STATUS: ${JSON.stringify(response.statusCode)},
        RESPONSE STATUS MESSAGE: ${JSON.stringify(response.statusMessage)}
      `);
    });
    next();
  }
}
