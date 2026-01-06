/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
@Injectable()
export class InterceptorLoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req=context.switchToHttp().getRequest();
    console.log(req.method);
    console.log(req.originalUrl);
    return next.handle().pipe(
      tap((data)=>{
        console.log('Response data:',data);
      }),
    );
  }
}
