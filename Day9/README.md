What is pipe?
A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface.

Pipes have two typical use cases:

transformation: transform input data to the desired form (e.g., from string to integer)
validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception
In both cases, pipes operate on the arguments being processed by a controller route handler. Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them. Any transformation or validation operation takes place at that time, after which the route handler is invoked with any (potentially) transformed arguments.

Nest comes with a number of built-in pipes that you can use out-of-the-box. You can also build your own custom pipes. In this chapter, we'll introduce the built-in pipes and show how to bind them to route handlers. We'll then examine several custom-built pipes to show how you can build one from scratch.

Hint
Pipes run inside the exceptions zone. This means that when a Pipe throws an exception it is handled by the exceptions layer (global exceptions filter and any exceptions filters that are applied to the current context). Given the above, it should be clear that when an exception is thrown in a Pipe, no controller method is subsequently executed. This gives you a best-practice technique for validating data coming into the application from external sources at the system boundary.
Built-in pipes#
Nest comes with several pipes available out-of-the-box:

ValidationPipe
ParseIntPipe
ParseFloatPipe
ParseBoolPipe
ParseArrayPipe
ParseUUIDPipe
ParseEnumPipe
DefaultValuePipe
ParseFilePipe
ParseDatePipe
They're exported from the @nestjs/common package.

Let's take a quick look at using ParseIntPipe. This is an example of the transformation use case, where the pipe ensures that a method handler parameter is converted to a JavaScript integer (or throws an exception if the conversion fails). Later in this chapter, we'll show a simple custom implementation for a ParseIntPipe. The example techniques below also apply to the other built-in transformation pipes (ParseBoolPipe, ParseFloatPipe, ParseEnumPipe, ParseArrayPipe, ParseDatePipe, and ParseUUIDPipe, which we'll refer to as the Parse* pipes in this chapter).

Binding pipes#
To use a pipe, we need to bind an instance of the pipe class to the appropriate context. In our ParseIntPipe example, we want to associate the pipe with a particular route handler method, and make sure it runs before the method is called. We do so with the following construct, which we'll refer to as binding the pipe at the method parameter level:



@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
This ensures that one of the following two conditions is true: either the parameter we receive in the findOne() method is a number (as expected in our call to this.catsService.findOne()), or an exception is thrown before the route handler is called.

For example, assume the route is called like:


GET localhost:3000/abc
Nest will throw an exception like this:


{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
The exception will prevent the body of the findOne() method from executing.

In the example above, we pass a class (ParseIntPipe), not an instance, leaving responsibility for instantiation to the framework and enabling dependency injection. As with pipes and guards, we can instead pass an in-place instance. Passing an in-place instance is useful if we want to customize the built-in pipe's behavior by passing options:



@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
Binding the other transformation pipes (all of the Parse* pipes) works similarly. These pipes all work in the context of validating route parameters, query string parameters and request body values.

For example with a query string parameter:



@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
Here's an example of using the ParseUUIDPipe to parse a string parameter and validate if it is a UUID.


JS

@Get(':uuid')
async findOne(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  return this.catsService.findOne(uuid);
}
Hint
When using ParseUUIDPipe() you are parsing UUID in version 3, 4 or 5, if you only require a specific version of UUID you can pass a version in the pipe options.
Above we've seen examples of binding the various Parse* family of built-in pipes. Binding validation pipes is a little bit different; we'll discuss that in the following section.

Hint
Also, see Validation techniques for extensive examples of validation pipes.
Custom pipes#
As mentioned, you can build your own custom pipes. While Nest provides a robust built-in ParseIntPipe and ValidationPipe, let's build simple custom versions of each from scratch to see how custom pipes are constructed.

We start with a simple ValidationPipe. Initially, we'll have it simply take an input value and immediately return the same value, behaving like an identity function.


validation.pipe.tsJS

import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
Hint
PipeTransform<T, R> is a generic interface that must be implemented by any pipe. The generic interface uses T to indicate the type of the input value, and R to indicate the return type of the transform() method.
Every pipe must implement the transform() method to fulfill the PipeTransform interface contract. This method has two parameters:

value
metadata
The value parameter is the currently processed method argument (before it is received by the route handling method), and metadata is the currently processed method argument's metadata. The metadata object has these properties:



export interface ArgumentMetadata {
  type: 'body' | 'query' | 'param' | 'custom';
  metatype?: Type<unknown>;
  data?: string;
}
These properties describe the currently processed argument.

type	Indicates whether the argument is a body @Body(), query @Query(), param @Param(), or a custom parameter (read more here).
metatype	Provides the metatype of the argument, for example, String. Note: the value is undefined if you either omit a type declaration in the route handler method signature, or use vanilla JavaScript.
data	The string passed to the decorator, for example @Body('string'). It's undefined if you leave the decorator parenthesis empty.
Warning
TypeScript interfaces disappear during transpilation. Thus, if a method parameter's type is declared as an interface instead of a class, the metatype value will be Object.
Schema based validation#
Let's make our validation pipe a little more useful. Take a closer look at the create() method of the CatsController, where we probably would like to ensure that the post body object is valid before attempting to run our service method.


JS

@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
Let's focus in on the createCatDto body parameter. Its type is CreateCatDto:


create-cat.dto.tsJS

export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}
We want to ensure that any incoming request to the create method contains a valid body. So we have to validate the three members of the createCatDto object. We could do this inside the route handler method, but doing so is not ideal as it would break the single responsibility principle (SRP).

Another approach could be to create a validator class and delegate the task there. This has the disadvantage that we would have to remember to call this validator at the beginning of each method.

How about creating validation middleware? This could work, but unfortunately, it's not possible to create generic middleware which can be used across all contexts across the whole application. This is because middleware is unaware of the execution context, including the handler that will be called and any of its parameters.

This is, of course, exactly the use case for which pipes are designed. So let's go ahead and refine our validation pipe.



What is Guards?
A guard is a class annotated with the @Injectable() decorator, which implements the CanActivate interface.

Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as authorization. Authorization (and its cousin, authentication, with which it usually collaborates) has typically been handled by middleware in traditional Express applications. Middleware is a fine choice for authentication, since things like token validation and attaching properties to the request object are not strongly connected with a particular route context (and its metadata).

But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the next() function. On the other hand, Guards have access to the ExecutionContext instance, and thus know exactly what's going to be executed next. They're designed, much like exception filters, pipes, and interceptors, to let you interpose processing logic at exactly the right point in the request/response cycle, and to do so declaratively. This helps keep your code DRY and declarative.

Hint
Guards are executed after all middleware, but before any interceptor or pipe.
Authorization guard#
As mentioned, authorization is a great use case for Guards because specific routes should be available only when the caller (usually a specific authenticated user) has sufficient permissions. The AuthGuard that we'll build now assumes an authenticated user (and that, therefore, a token is attached to the request headers). It will extract and validate the token, and use the extracted information to determine whether the request can proceed or not.


auth.guard.tsJS

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}
Hint
If you are looking for a real-world example on how to implement an authentication mechanism in your application, visit this chapter. Likewise, for more sophisticated authorization example, check this page.
The logic inside the validateRequest() function can be as simple or sophisticated as needed. The main point of this example is to show how guards fit into the request/response cycle.

Every guard must implement a canActivate() function. This function should return a boolean, indicating whether the current request is allowed or not. It can return the response either synchronously or asynchronously (via a Promise or Observable). Nest uses the return value to control the next action:

if it returns true, the request will be processed.
if it returns false, Nest will deny the request.


What is Interceptor?
An interceptor is a class annotated with the @Injectable() decorator and implements the NestInterceptor interface.

Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

bind extra logic before / after method execution
transform the result returned from a function
transform the exception thrown from a function
extend the basic function behavior
completely override a function depending on specific conditions (e.g., for caching purposes)
Basics#
Each interceptor implements the intercept() method, which takes two arguments. The first one is the ExecutionContext instance (exactly the same object as for guards). The ExecutionContext inherits from ArgumentsHost. We saw ArgumentsHost before in the exception filters chapter. There, we saw that it's a wrapper around arguments that have been passed to the original handler, and contains different arguments arrays based on the type of the application. You can refer back to the exception filters for more on this topic.

Execution context#
By extending ArgumentsHost, ExecutionContext also adds several new helper methods that provide additional details about the current execution process. These details can be helpful in building more generic interceptors that can work across a broad set of controllers, methods, and execution contexts. Learn more about ExecutionContexthere.

Call handler#
The second argument is a CallHandler. The CallHandler interface implements the handle() method, which you can use to invoke the route handler method at some point in your interceptor. If you don't call the handle() method in your implementation of the intercept() method, the route handler method won't be executed at all.

This approach means that the intercept() method effectively wraps the request/response stream. As a result, you may implement custom logic both before and after the execution of the final route handler. It's clear that you can write code in your intercept() method that executes before calling handle(), but how do you affect what happens afterward? Because the handle() method returns an Observable, we can use powerful RxJS operators to further manipulate the response. Using Aspect Oriented Programming terminology, the invocation of the route handler (i.e., calling handle()) is called a Pointcut, indicating that it's the point at which our additional logic is inserted.

Consider, for example, an incoming POST /cats request. This request is destined for the create() handler defined inside the CatsController. If an interceptor which does not call the handle() method is called anywhere along the way, the create() method won't be executed. Once handle() is called (and its Observable has been returned), the create() handler will be triggered. And once the response stream is received via the Observable, additional operations can be performed on the stream, and a final result returned to the caller.