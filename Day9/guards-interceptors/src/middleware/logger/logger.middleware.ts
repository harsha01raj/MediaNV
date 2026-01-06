import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { appendFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const log = `[${new Date().toISOString()} ${req.method}]-[${req.originalUrl}]`;
    const logFilePath = path.join(process.cwd(), 'logger.txt');
    try {
      await appendFile(logFilePath, log);
    } catch (error) {
      console.log('Failed to write log:', error);
    }
    next();
  }
}
