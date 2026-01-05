What middleware is in NestJS and how it differs from Express middleware?
In NestJS, middleware is a function or class that runs before the route handler(controller method).

It can:
. Modify the request(req).
. Modify teh response(res).
. End the request-response cycle.
. Pass control to the next middleware using next();

Typical uses:-
. Logging
. Authentication
. Authorization
. Request validation
. Adding headers
. Request transformation

NestJS middleware is similar to Express middleware but is structured, DI-enabled, module-based, and works alongside guards, pipes, interceptors, and filters for better separation of concerns.


Built-in vs custom middleware?

Built-in Middleware(NestJs):-
NestJS itself doesn't provide many built-in middleware out of the box.

Common Built-in / Preconfigured middleware

Middleware                      Purpose
express.json()                  Parse JSON request body
express.urlencoded()            Parse URL-encoded data
cors()                          Enable CORS
helmet()                        Security headers
compression()                   Gzip compression
morgan()                        HTTP request logging

In NestJS, these are usually enabled in main.ts.


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  await app.listen(3000);
}
bootstrap();

Fast to use
Well-tested
No custom logic

Custom Middleware(NestJS):-
Custom middleware is written by you when built-in ones are not enough.

Use Cases:-
. Custom logging
. Token extraction
. Request modification
. IP filtering
. Features flags
. Rate limiting (custom)


Class-based Custom Middleware(Recommended):-
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}

Apply Custom Middleware:-

import { MiddlewareConsumer, Module } from '@nestjs/common';

@Module({})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}

Supports Dependency injection
Scoped to routes/modules
Cleaner architecture


Built-in vs Custom Middleware(Comparison)
Features                Built-in Middleware             Custom Middleware
Written by              Framework/Library               You
Configuration           Minimal                         Fully customizable
Dependency Injection    can't                           can
Business Logic          can't                           can
Reusability             High                            High
Best for                Common tasks                    App-specific logic


Applying middleware globally, at module level, and per route?
NestJs middleware can be applied at:
1. Global level
2. Module level
3. Route (controller/endpoint) level

Important:
NestJs does Not support method-level middleware like
@UseMidddleware()
for per-endPoint logic ->use Guards/Interceptors

1. Global Middleware
Applies to every request in the app

How to apply
In main.ts using app.use() (same as Express).
// main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    console.log('Global Middleware');
    next();
  });

  await app.listen(3000);
}
bootstrap();


Use cases:-
. Body Parsing
. CORS
. Security headers
. Global logging


2. Module-Level Middleware(Most Common)
Applies only to selected routes inside a module.

Step 1: Create middleware
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()

export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Module Middleware');
    next();
  }
}

Step 2: Apply in module

import { MiddlewareConsumer, Module } from '@nestjs/common';

@Module({})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // all routes in this module
  }
}


Use cases
. Module-specific logging
. Request preprocessing
. Feature isolation

3. Per-Route Middleware(Controller level):
NestJS does NOT support middleware directly on individual methods.

This does Not exist:-@UseMiddleware(LoggerMiddleware) 


Correct Approach for Per-Route Logic
Requirement                             Use
Auth/Role check                         Guard
Validation                              Pipe
Logging                                 Interceptor
Response transform                      Interceptor


Example: Per-route Guards
@UseGuards(AuthGuard)
@Get('profile')
getProfile() {
  return 'Protected route';
}


Execution Order(Very Impportant):-

Global Middleware
   ↓
Module Middleware
   ↓
Route Middleware
   ↓
Guards
   ↓
Pipes
   ↓
Interceptors (before)
   ↓
Controller
   ↓
Interceptors (after)
   ↓
Exception Filters


Accessing request/response objects:-
In NestJS, accessing the request (req) and response (res) depends on where you are in the request lifecycle. Since you already know Express, I’ll map everything clearly to that mental model.

Middleware execution order:-

Incoming HTTP Request
        ↓
Global Middleware (app.use in main.ts)
        ↓
Module-level Middleware (configured in modules)
        ↓
Route-specific Middleware (via forRoutes)
        ↓
Guards (Global → Controller → Method)
        ↓
Pipes (Global → Controller → Method)
        ↓
Interceptors (Before)
        ↓
Controller Route Handler
        ↓
Interceptors (After)
        ↓
Exception Filters (if error occurs)
        ↓
HTTP Response


Use cases (logging, authentication, request modification):-
Middleware Use Cases in NestJS

Middleware is best for early, lightweight request handling.
Think of it as “pre-processing” before NestJS logic starts.

⸻

1️⃣ Logging ✅ (BEST use case)

Why middleware is perfect for logging
Runs before controller
Sees raw request
No business logic needed
Works for all routes

Example: Request Logger Middleware
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`,
      );
    });

    next();
  }
}

Best for
API request logs
Performance monitoring
Debugging


2️⃣ Authentication ⚠️ (LIMITED use case)

What middleware CAN do
Extract token
Attach data to request
2️⃣ Authentication ⚠️ (LIMITED use case)

What middleware CAN do
Extract token
Attach data to request


Understanding NestJS exception handling flow:-
NestJS has a centralized, layered error-handling system built on top of Express/Fastify.
High-Level Flow (Bird's-Eye View)
Request
 ↓
Middleware
 ↓
Guards
 ↓
Pipes
 ↓
Interceptors (before)
 ↓
Controller / Service
 ↓
Interceptors (after)
 ↓
Exception Filters
 ↓
HTTP Response
➡️ If an error occurs at ANY stage, it jumps directly to Exception Filters.


Built-in HTTP exceptions (HttpException, BadRequestException, etc.):-
NestJS provides built-in HTTP exceptions so you don’t have to manually set status codes or error responses. These are core to NestJS exception handling and heavily used in real projects and interviews.
Built-in HTTP Exceptions in NestJS.
All HTTP exceptions in NestJS extend HttpException.

HttpException
   ├── BadRequestException (400)
   ├── UnauthorizedException (401)
   ├── ForbiddenException (403)
   ├── NotFoundException (404)
   ├── MethodNotAllowedException (405)
   ├── NotAcceptableException (406)
   ├── RequestTimeoutException (408)
   ├── ConflictException (409)
   ├── GoneException (410)
   ├── PayloadTooLargeException (413)
   ├── UnsupportedMediaTypeException (415)
   ├── UnprocessableEntityException (422)
   ├── InternalServerErrorException (500)
   ├── NotImplementedException (501)
   ├── BadGatewayException (502)
   ├── ServiceUnavailableException (503)
   └── GatewayTimeoutException (504)


Global vs scoped exception filters:-
Exception filters decide how errors are formatted and returned.

NestJS allows you to apply them at three levels:
1. Global
2. Controller(Scoped)
3. Route(Scoped)

1. Global Exception Filters
Applies to every route in the application

How to apply

Option 1: Using UseGlobalFilters() (Most common)

//main.ts
async function bootstrap(){
    const app=await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.listen(3000);
}


Option 2. Using APP_FILTER (Recommended)
// app.module.ts
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}

Supports Dependency injection
Clean & testable

Use Cases
. Standard error format
. Logging all errors
. Masking internal Errors
. Centralized error handling




2. Controller-Level exception filters(scoped)

Applies only to a specific controller
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UserController {}

Overrides global filter for this controller
Useful for module-specific error formats

3. Route-Level Exception Filters(Scoped)
Applies only to a specific endpoint
@UseFilters(HttpExceptionFilter)
@Get(':id')
findOne() {}

Highest priority
Very fine-grained control
Exception Filter Resolution Order (CRITICAL)

NestJS checks filters in this order:-
Route-level filter
   ↓
Controller-level filter
   ↓
Global filter
   ↓
Default NestJS filter

Creating Custom Exception Filters in NestJS:-
Exception filters catch thrown errors and control the HTTP response format.

1. Basic Custom Exception Filter
    Step 1: Create the filter
    import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse['message'],
    });
  }
}


2. Catching ALL Exceptions(HTTP + Non-HTTP)
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
    });
  }
}


3. Applying Custom Execption Filters
Global (Best Practice)

Option 1: APP_FILTER(Recommended)
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

Dependency Injection works
Clean & testable

Controller-Level
@UseFilters(HttpExceptionFilter)
@Controller('users')
export class UserController {}


Route-Level
@UseFilters(HttpExceptionFilter)
@Get(':id')
findOne() {}

Exception Filter Execution Priority
Route-level
 ↓
Controller-level
 ↓
Global
 ↓
Default NestJS filter


Formatting Consistent Error Responses in NestJS:-
Every error response should look the same, no matter where it comes from:
Validation errors
Auth errors
Business logic errors
Unexpected server errors


Catching and handling unexpected errors:-

Handling Unexpected Errors in NestJS
Goal:
Catch errors thrown by the system, DB, or runtime.
Format them consistently.
Log them for debugging.
Return safe response to clients.

1. Use @Catch() Without Parameters
To catch all errors, you create a catch-all exception filter:
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Optional: Log the error
    console.error('Unexpected error:', exception);

    response.status(status).json({
      success: false,
      statusCode: status,
      error: HttpStatus[status],
      message:
        typeof message === 'string'
          ? message
          : (message as any).message || 'Internal server error',
      path: request.url,
      timestamp: new Date().toISOString(),
      requestId: request.requestId,
    });
  }
}



Explain request lifecycle involving middleware and exception filters:-
When a client sends an HTTP request, NestJS processes it in layers, each with a specific role.
1️⃣ Incoming HTTP Request
Client → Server
GET /users/123
Headers, body, query

NestJS hands the request to the platform adapter (Express or Fastify).

2. Middleware
Middleware runs first, before NestJS controllers or services.
Global Middleware → runs for all routes (app.useGlobal())
Module Middleware → runs for routes inside a module (consumer.apply().forRoutes())
Route-specific Middleware → runs only on selected routes (forRoutes({path, method}))

Middleware can:
Log requests
Modify req object
Add requestId
Perform early preprocessing

app.use((req, res, next) => {
  console.log(req.method, req.url);
  req.requestId = 'abc123';
  next();
});

3. Guards
Guards run after middleware but before controller execution.
Used for authentication & authorization
Can stop request execution (return 403/401)
Access ExecutionContext to inspect request & route.

@UseGuards(AuthGuard)
@Get(':id')

4. Pipes

Pipes run after guards, before controllers:
. Used for validation (ValidationPipe)
. Transform data(e.g., convert string to number)
. Can throw BadRequestException if validation fails.
@Param('id', ParseIntPipe) id: number


5. Interceptors(Before)
Interceptors run before controller logic:
. Can modify request or start timers.
. Can log request duration
. Can wrap controller execution in next.handle()
@UseInterceptors(LoggingInterceptor)

6. Controller/ Route Handler
Finally, the controller executes:
. Business logic
. Service calls
. May throw exceptions (HTTP or unexpected)

@Get(':id')
findUser(@Param('id') id: string) {
  throw new NotFoundException('User not found');
}

7.InterCeptors(After)
After controller returns, interceptors can:
. Transform responose
. Log response
. Measure execution time

8. Exception Filters
if any layer throws an exception:
. Middleware -> can catch if try/catch is used(not typical).
. Guards/Pipes/Controller -> Exceptions bubbles up
. NestJS searches for exception filters: 
Route-level filter → Controller-level → Global filter → Default filter
Filter formats response and sends it back to the client
Filter can handle known (HttpException) and unknown (Error) exceptions
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) { ... }
}


Execution Order Diagram(Text-Based):-
Incoming Request
       ↓
[Global Middleware]
       ↓
[Module Middleware]
       ↓
[Route Middleware]
       ↓
[Guard] ------------------- (can stop execution)
       ↓
[Pipe] -------------------- (can throw BadRequestException)
       ↓
[Interceptor Before] ------ (pre-processing)
       ↓
[Controller / Service] ---- (may throw exceptions)
       ↓
[Interceptor After] ------- (post-processing)
       ↓
[Exception Filters] ------- (catch & format exceptions)
       ↓
HTTP Response Sent
