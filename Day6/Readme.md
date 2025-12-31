What NestJS is and its use cases?
Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).

Under the hood, Nest makes use of robust HTTP Server frameworks like Express (the default) and optionally can be configured to use Fastify as well!

Nest provides a level of abstraction above these common Node.js frameworks (Express/Fastify), but also exposes their APIs directly to the developer. This gives developers the freedom to use the myriad of third-party modules which are available for the underlying platform.

NestJS project setup (CLI overview):-

1. What is NestJS CLI?
The NestJS CLI is a command-line tool that helps you:
. Create a NestJS project quickly
. Generate modules,controllers,services,etc.
. Run,build, and test applications.
. Follow best practices & project structure automatically

2. Install NestJS CLI
Prerequisites
. Node.js(V18 + recommended)
. npm or yarn

Install globally:- npm install -g @nestjs/cli
Verify installation:- nest --version

Create a New NestJS Project:-nest new my-nest-app
CLI will ask:
. Project name
. Package manager (npm/yarn/pnpm)


After setup:
cd my-nest-app
npm run start:dev
App runs at: http://localhost:3000


key files Explained
. main.ts -> Bootstraps the app.
. app.module.ts -> Root module.
. controller -> Handles HTTP requests.
. services -> Contains logic.
. module -> Group related components.

5. Running the Application (CLI Commands):-
Command             Purpose
npm run start.      Start app
npm run start:dev   Start with hot reload
npm run start:prod  Production mode
npm run build       Compile TypeScript
npm run test        Run unit tests
npm run test:e2e    Run E2E tests


6. Generate Files Using CLI (Very Important)
Nest CLI can generate boilerplate automatically.

Generate a module.
nest generate module users
shortcut- nest g m users

Generate a Controller
nest generate controller users
shortcut- nest g c users

Generate a service
nest generate services users
shortcut- nest g s users

Generate all at once (recommended)
nest generate resource users 
shortcut:- nest g res users

7. Enable Environment Variables(Recommended Setup):-
Install:
npm install @nestjs/config


8. Production-Ready CLI Features
. Linting: npm run lint
. Formatting: npm run format
. Testing: Jest support built-in
. TypeScript: Fully configured


* NestJS Application Structure & Architecture:-
Nest.js follows a modular, layered architecture inspired by Angular, OOP, FP, and SOLID principles.

1. High-Level Architecture(Request Flow):-
Client
Middleware
Guards(Auth / Roles)
Interceptors
Pipes(Validation/Transformation)
Controller
Services
Repository / Database
Service -> Controller -> Response

2. Core Building Blocks
   Module(Foundation)
. Groups related components.
. Controls dependency scope
. Every Nest app has at least one module.

@module({
    imports:[],
    controllers:[],
    providers:[],
})
export class UserModule {}

  Controller (API Layer)
. Handles incoming HTTP requests.
. Return responses
. No business logic

@Controller('user')
export class UserController{
    @Get()
    getUsers(){
        return this.userServices.findAll();
    }
}

  Service (Business Logic Layer)
. Contains core logic
. Reusable & testable
. Injected into controllers

@Injectable()
export class UserService{
    findAll(){
        return ['Harsh','Raj'];
    }
}


  Provider(Dependency Injection)
. Services,repositories,helpers
. Managed by Nest's IOC container

@Injectable()
export class EmailService {}


Standard Folder Structure(Feature-Based)
src/
    app.module.ts
    main.ts


    users/
        users.controller.ts
        users.service.ts
        users.module.ts
        dto
            create-user.dto.ts
        entities
            user.entity.ts
    
    auth
        auth.module.ts
        auth.service.ts
        auth.controller.ts
        guards
    
    common
        guards/
        filters/
        interceptors/
        pipes/

4. Layers Explained (Clean Architecture)
Presentation Layer
. Controllers
. DTOs
. Pipes

Application Layer
. Services
. Use cases
. Business rules

Infrastructure Layer
. Database
. Repositories
. External APIs

5. Cross-Cutting Concerns
Middleware

Runs before routing:-app.use(loggerMiddleware);

Use cases:
. Logging
. Request modification

Authorization & authentication
@UseGuards(AuthGuard)

Pipes
Validation & transformation
@Body(new ValidationPipe())

Interceptors
Wrap requests/response
@UseInterceptors(LogginInterceptor);

Exception Filters
Global error handling
@Catch(HttpException)

6. Dependency Injection (DI)
NestJS uses constructor-based DI

constructor(private readonly userService: UserService) {}


* Modules, Controllers, Services and Providers:-
Modules:- Modules is a folder use to store the controller,services and provider related to the same data.

Controller:-This is file use to handle routes for the data.

Services:- This is file use to handle the task realated to the routes.

Providers- This is also a type of Sevices that is responsible for a task.

Dependency Injection (DI):-
Dependency injection is a way from which we can use services and provider in controller.By create the instanceor object of services and provider like this:-
constructor(private readonly instancename:ServicesName) {}

Routing and request handling:-
Routing is the way from which server can decide what to do in server or handle by controller.In controller first controller check what type of request is in route get,post,put,patch or delete according the request type contoller handle the task.


Basic request validation (intro):-
Dto is used for Basic request validation with the help of validator.

Middleware, Guards, and Interceptors (overview):

Middleware:-Middleware is a function which is called before the route handler. Middleware functions have access to the request and response objects, and the next() middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

Guards:-A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.ads via Carbon.
A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.
Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as authorization. Authorization (and its cousin, authentication, with which it usually collaborates) has typically been handled by middleware in traditional Express applications. Middleware is a fine choice for authentication, since things like token validation and attaching properties to the request object are not strongly connected with a particular route context (and its metadata).

ads via Carbon
Check out the latest remote job listings from Authentic Jobs.
ads via Carbon
Request lifecycle
Nest applications handle requests and produce responses in a sequence we refer to as the request lifecycle. With the use of middleware, pipes, guards, and interceptors, it can be challenging to track down where a particular piece of code executes during the request lifecycle, especially as global, controller level, and route level components come into play. In general, a request flows through middleware to guards, then to interceptors, then to pipes and finally back to interceptors on the return path (as the response is generated).

Middleware#
Middleware is executed in a particular sequence. First, Nest runs globally bound middleware (such as middleware bound with app.use) and then it runs module bound middleware, which are determined on paths. Middleware are run sequentially in the order they are bound, similar to the way middleware in Express works. In the case of middleware bound across different modules, the middleware bound to the root module will run first, and then middleware will run in the order that the modules are added to the imports array.


Interceptors:-
Interceptors, for the most part, follow the same pattern as guards, with one catch: as interceptors return RxJS Observables, the observables will be resolved in a first in last out manner. So inbound requests will go through the standard global, controller, route level resolution, but the response side of the request (i.e., after returning from the controller method handler) will be resolved from route to controller to global. Also, any errors thrown by pipes, controllers, or services can be read in the catchError operator of an interceptor.


Pipes#
Pipes follow the standard global to controller to route bound sequence, with the same first in first out in regards to the @UsePipes() parameters. However, at a route parameter level, if you have multiple pipes running, they will run in the order of the last parameter with a pipe to the first. This also applies to the route level and controller level pipes. For example, if we have the following controller:

@UsePipes(GeneralValidationPipe)
@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @UsePipes(RouteSpecificPipe)
  @Patch(':id')
  updateCat(
    @Body() body: UpdateCatDTO,
    @Param() params: UpdateCatParams,
    @Query() query: UpdateCatQuery,
  ) {
    return this.catsService.updateCat(body, params, query);
  }
}


If you're using a global catch-all exception filter (which is either a filter registered with app.useGlobalFilters() or a filter registered in your app module providers annotated with a @Catch() decorator without arguments), add a @SentryExceptionCaptured() decorator to the filter's catch() method. This decorator will report all unexpected errors that are received by your global error filter to Sentry:

import { Catch, ExceptionFilter } from '@nestjs/common';
import { SentryExceptionCaptured } from '@sentry/nestjs';

@Catch()
export class YourCatchAllExceptionFilter implements ExceptionFilter {
  @SentryExceptionCaptured()
  catch(exception, host): void {
    // your implementation here
  }
}


We'll be using the basic version of the example code from the configuration chapter for this section. The completed version as of the end of this chapter is available as a working example here.

Our requirement is to make ConfigModule accept an options object to customize it. Here's the feature we want to support. The basic sample hard-codes the location of the .env file to be in the project root folder. Let's suppose we want to make that configurable, such that you can manage your .env files in any folder of your choosing. For example, imagine you want to store your various .env files in a folder under the project root called config (i.e., a sibling folder to src). You'd like to be able to choose different folders when using the ConfigModule in different projects.

Dynamic modules give us the ability to pass parameters into the module being imported so we can change its behavior. Let's see how this works. It's helpful if we start from the end-goal of how this might look from the consuming module's perspective, and then work backwards. First, let's quickly review the example of statically importing the ConfigModule (i.e., an approach which has no ability to influence the behavior of the imported module). Pay close attention to the imports array in the @Module() decorator:



import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

Environment variables:-
An environment variable is a key–value pair used to store configuration data outside your code.
It helps your application behave differently in different environments (development, testing, production) without changing the source code