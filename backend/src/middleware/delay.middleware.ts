import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Simulate a delay of 1 second
    setTimeout(next, 1000);
  }
}
