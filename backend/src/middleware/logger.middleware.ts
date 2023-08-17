import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    const start = new Date();
    const { method, url, ip } = req;

    res.on('finish', () => {
      const end = new Date();
      const responseTime = end.getTime() - start.getTime();
      const statusCode = res.statusCode;

      const logFormat = `[${start.toLocaleString()}] ${ip} - "${method} ${url}" ${statusCode} (${responseTime}ms)`;

      if (statusCode >= 500) {
        this.logger.error(logFormat);
      } else if (statusCode >= 400) {
        this.logger.warn(logFormat);
      } else {
        this.logger.log(logFormat);
      }
    });

    next();
  }
}
