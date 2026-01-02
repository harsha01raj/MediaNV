What Pipes are and when to use them?
In NestJS, Pipes are classes decorated with @Injectable() that implement the PipeTransform interface. They operate on the arguments of a route handler just before the method is invoked. 
When to Use Pipes
Pipes have two primary use cases:
Transformation: Converting incoming request data into a desired format.
Example: Converting a string ID from a URL into a JavaScript integer.
Validation: Checking if incoming data meets specific criteria.
Example: Ensuring a request body contains all required fields with correct types before the controller processes it. If validation fails, the pipe throws an exception, and the controller method is never executed. 
Built-in Pipes
NestJS provides several out-of-the-box pipes to handle common tasks:
ValidationPipe: Validates incoming payloads using class-validator decorators.
ParseIntPipe / ParseFloatPipe: Converts strings to numbers.
ParseBoolPipe: Converts strings like "true" or "false" to boolean values.
ParseUUIDPipe: Validates that a string is a valid UUID.
DefaultValuePipe: Sets a default value if a parameter is missing.
ParseArrayPipe: Parses and validates arrays. 
Execution Order & Scope
Pipes run after Guards but before the Controller method. They can be applied at different levels: 
Global Level: Applies to every route in the application (e.g., app.useGlobalPipes(new ValidationPipe())).
Controller Level: Applies to every route within a specific controller.
Method Level: Applied to a specific route handler.
Parameter Level: Applied directly to a specific argument like @Param('id', ParseIntPipe). 


Built-in pipes (ValidationPipe, ParseIntPipe, ParseBoolPipe, etc.):-
In NestJS, built-in pipes are specialized tools for validating and transforming incoming request data before it reaches your controller. As of 2026, there are approximately ten built-in pipes commonly used for these tasks. 
Key Built-In Pipes
ValidationPipe: The most powerful pipe, used for automatic validation of entire objects (DTOs). It integrates with class-validator to enforce rules like @IsEmail() or @IsNotEmpty().
ParseIntPipe: Converts a string input (from a route or query parameter) into a JavaScript integer. It throws a BadRequestException if the string is not numeric.
ParseBoolPipe: Transforms a string like "true" or "false" into a boolean value.
ParseUUIDPipe: Ensures that an incoming string follows a valid UUID format.
DefaultValuePipe: Assigns a fallback value if a parameter is missing or undefined.
ParseArrayPipe: Validates and transforms comma-separated strings into arrays.
ParseFloatPipe: Similar to ParseIntPipe, but converts inputs to floating-point numbers.
ParseEnumPipe: Validates that an incoming value belongs to a specific TypeScript enum.
ParseFilePipe: Used primarily for handling and validating file uploads. 
How to Use Them
You can apply these pipes at different scopes depending on your needs:
Parameter Scope (Most Common): Apply directly to a route argument.
typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.service.findOne(id); // 'id' is guaranteed to be a number here
}
Use code with caution.

Global Scope: Apply to every route in your entire application. This is commonly used for ValidationPipe in main.ts.
typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
Use code with caution.

Controller or Method Scope: Use the @UsePipes() decorator to apply a pipe to all routes in a class or a single method. 
Benefits
Security: Prevents malformed or malicious data from entering your business logic.
Cleaner Code: Removes boilerplate code for manual type conversion and check logic from your controllers.
Consistency: Standardizes error responses (e.g., automatically returning a 400 Bad Request if validation fails). 


Data transformation vs validation:-
In NestJS, pipes are designed to handle two distinct responsibilities. While a single pipe can perform both, understanding the difference is critical for clean architecture.
1. Data Transformation
Transformation is the process of changing the input data into a different format, type, or shape required by your application logic.
Goal: To ensure the controller receives data in the correct JavaScript type or structure.
Common Scenarios:
String to Number: Converting a URL string "/items/5" into a number 5 using ParseIntPipe.
Default Values: Providing a fallback if a query parameter is missing (e.g., setting a default page=1).
Object Mapping: Mapping a plain JavaScript object into a specific Class instance so you can use its methods.
Formatting: Trimming whitespace from strings or converting emails to lowercase before saving them.
Example:
typescript
// Transforms the string 'true' into the boolean true
@Get()
findAll(@Query('active', ParseBoolPipe) active: boolean) { 
  return active; 
}
Use code with caution.

2. Data Validation
Validation is the process of evaluating the input data against specific rules and rejecting the request if those rules are not met.
Goal: To ensure the data is "correct" and safe before it hits your database or business logic.
Common Scenarios:
Type Checking: Ensuring a field that should be a string isn't sent as an array.
Constraints: Checking if a password is at least 8 characters or if an age is over 18.
Schema Compliance: Ensuring the request body contains all required fields defined in a DTO (Data Transfer Object).
Outcome: If validation fails, the pipe throws an exception (usually a 400 Bad Request), and the controller method never executes.
Example:
typescript
// Validates that the body matches the CreateUserDto rules
@Post()
create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  return this.service.create(createUserDto);
}
Use code with caution.

Key Differences at a Glance
Feature	Data Transformation	Data Validation
Primary Action	Changes the data (e.g., string → number)	Checks the data (e.g., isEmail?)
Logic	"Make this data usable."	"Is this data allowed?"
Standard Pipe	ParseIntPipe, DefaultValuePipe	ValidationPipe
Result of Failure	Usually a 400 Bad Request if conversion is impossible	Always a 400 Bad Request with error details
Timing	Happens before the controller method starts	Happens before the controller method starts
The "Power Couple"
In a real-world NestJS app, you often use them together. For example, the ValidationPipe can be configured with { transform: true }. This allows it to validate that an ID is numeric and then immediately transform it from a string to a number in one step.


Global vs route-scoped vs parameter-scoped pipes
In NestJS, the "scope" of a pipe determines exactly which parts of your application it affects. Choosing the right scope helps you balance global consistency with specific data handling.
1. Global-scoped Pipes
These pipes are applied to every single route handler across the entire application.
How to define: Usually set in main.ts using app.useGlobalPipes().
When to use: Use this for universal rules, such as a ValidationPipe that enforces DTO rules for every endpoint or a pipe that trims whitespace from all incoming strings.
Example:
typescript
// main.ts
app.useGlobalPipes(new ValidationPipe());
Use code with caution.

2. Route-scoped (or Controller-scoped) Pipes
These pipes apply to all methods within a specific Controller or to one specific route method.
How to define: Use the @UsePipes() decorator at the class or method level.
When to use: Use this when a specific set of logic (like a specific transformation) is needed only for certain types of resources (e.g., all routes in CustomerController).
Example:
typescript
@UsePipes(new MyCustomPipe())
@Controller('customer')
export class CustomerController {
  @Post()
  create(@Body() body: any) { ... }
}
Use code with caution.

3. Parameter-scoped Pipes
These pipes are applied directly to a specific argument within a route handler.
How to define: Place the pipe inside the parameter decorator (like @Param(), @Query(), or @Body()).
When to use: This is the most common and precise method. Use it for data transformation, such as converting a specific ID to an integer or a string to a boolean.
Example:
typescript
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
    // id is guaranteed to be a number here
    return this.service.findOne(id);
}
Use code with caution.

Comparison Summary
Scope	Defined In	Impact	Use Case Example
Global	main.ts	Every route in the app	General ValidationPipe for all DTOs
Route/Controller	@UsePipes()	Every method in that class	Specific logic for one module
Parameter	@Param(..., Pipe)	Only that specific argument	ParseIntPipe for a specific ID
Execution Priority
If pipes are defined at multiple levels, they execute in this order:
Global pipes
Controller pipes
Route (Method) pipes
Parameter pipes
Pro Tip for 2026: Prefer Parameter-scoped pipes for simple transformations (like ParseIntPipe) to keep your code readable and explicit, while keeping Global pipes strictly for app-wide validation rules



Understanding decorators in NestJS:-
In NestJS, Decorators are functions that allow you to attach metadata to classes, methods, or parameters. They are the "secret sauce" that allows NestJS to handle routing, dependency injection, and data validation automatically. 
As of January 2, 2026, decorators remain the primary way to define application logic in NestJS.
1. Core Types of Decorators
Class Decorators
These define the role of a class within the NestJS system. 
@Module(): Defines a module that organizes code and manages dependencies.
@Controller('path'): Marks a class as a controller to handle specific incoming requests.
@Injectable(): Marks a class (like a Service or Pipe) as a provider that the NestJS IoC container can manage. 
Method Decorators (Routing)
These determine which HTTP method triggers a specific function in your controller. 
@Get(), @Post(), @Put(), @Delete(), @Patch(): Map specific HTTP verbs to a method. 
Parameter Decorators
These extract specific parts of the incoming request and inject them as arguments into your method. 
@Body(): Access the request body (e.g., JSON data).
@Param('key'): Access URL path parameters (e.g., /user/:id).
@Query('key'): Access URL query strings (e.g., ?search=term).
@Req() and @Res(): Access the underlying Request and Response objects (use sparingly). 
2. How They Work (Under the Hood)
Decorators use a feature called Reflect Metadata. When you use a decorator like @Get('/users'), NestJS isn't running the code immediately. Instead, it "notes down" that "Method X handles GET requests for /users." 
When the application starts (the Bootstrap phase), NestJS reads all these notes to build a map of your entire API.
3. Custom Decorators
NestJS allows you to create your own decorators to make your code cleaner. For example, if you frequently need to get the "User ID" from a JWT token in the request, you can create a @User() decorator. 
Example of a Custom Decorator:
typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

// Usage in a controller:
@Get('profile')
getProfile(@User('email') email: string) {
  return `Your email is ${email}`;
}
Use code with caution.

4. Why use them?
Declarative Programming: You describe what the code should do (e.g., "This is a GET route") rather than writing the manual logic to check the HTTP method.
Separation of Concerns: Your business logic stays inside the method, while the "plumbing" (getting data from the request) is handled by the decorator.
Readability: It is immediately obvious what a class or method does just by glancing at the decorators above it. 
Summary Table
Decorator 	Level	Purpose
@Controller()	Class	Defines the base route for a set of endpoints.
@Injectable()	Class	Allows the class to be used as a dependency elsewhere.
@Get('path')	Method	Defines a listener for HTTP GET requests.
@Body()	Parameter	Grabs the incoming payload from a request.
@UsePipes()	Method/Class	Applies a Pipe to validate or transform data.



Creating custom parameter decorators
Custom parameter decorators allow you to encapsulate and reuse logic for extracting data from a request. This is commonly used for grabbing user metadata from a JWT or selecting specific properties from a request object. 
1. Create the Decorator
Use the createParamDecorator function provided by @nestjs/common. This function takes a factory that has access to the data passed to the decorator and the ExecutionContext. 
typescript
// user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // Switch context to HTTP and get the underlying request
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // If data (a key) is provided, return that specific property; otherwise return the whole user
    return data ? user?.[data] : user;
  },
);
Use code with caution.

2. Use it in a Controller
You can now use @User() to inject the entire user object or @User('key') to inject just one field directly into your method. 
typescript
@Get('profile')
getProfile(@User() user: any) {
  return user;
}

@Get('email')
getEmail(@User('email') email: string) {
  return `User email is: ${email}`;
}
Use code with caution.

Key Components
Factory Function: The logic that runs whenever the decorator is called. It receives data and ctx.
data parameter: Any value passed directly to the decorator (e.g., the 'email' in @User('email')).
ExecutionContext (ctx): An object providing access to the current request and response, which is essential for interacting with HTTP-specific parts of the execution.
Type Safety: In 2026, it is standard practice to use generics with createParamDecorator<T>() to ensure your decorator returns the correct type. 
Why use them?
Readability: Makes your method signatures transparent and clean.
Reusability: Avoids repeating the same request.user logic in every controller.
Encapsulation: Keeps the "plumbing" of how data is retrieved separate from your business logic. 



In NestJS, while you can access the raw request using the @Req() decorator, the best practice in 2026 is to use specific decorators or Custom Param Decorators to keep your code clean, testable, and decoupled from the underlying platform (Express or Fastify).
1. Common Built-in Decorators
Use these for standard HTTP request data:
Target Data	Decorator	Example Usage
Headers	@Headers()	findOne(@Headers('authorization') auth: string)
Tokens/Auth	@Headers()	getSecret(@Headers('x-api-key') key: string)
Query Params	@Query()	findAll(@Query('page') page: number)
Route Params	@Param()	findOne(@Param('id') id: string)
Body	@Body()	create(@Body() dto: CreateUserDto)
2. Accessing the User (The "Best Practice" Way)
When using authentication (like Passport or JWT guards), the user object is usually attached to request.user. Instead of typing request.user everywhere, create a Custom Decorator:
Step 1: Create the decorator
typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
Use code with caution.

Step 2: Use it in your controller
typescript
@Get('me')
@UseGuards(JwtAuthGuard)
getMe(@GetUser() user: any, @GetUser('email') email: string) {
  return { user, email };
}
Use code with caution.

3. Accessing Cookies
To access cookies, you first need to install cookie-parser (for Express) and then use the @Headers() or a custom decorator.
typescript
@Get()
getCookies(@Headers('cookie') allCookies: string) {
  return allCookies;
}
Use code with caution.

Note: For a more elegant approach, you can create a @Cookies() custom decorator similar to the GetUser example above.
4. When to use @Req()
You should only use the @Req() decorator when you need access to properties that aren't covered by standard decorators, such as custom properties added by mid-level middleware or specific library integrations.
typescript
@Get()
handleRaw(@Req() request: Request) {
  const ip = request.ip;
  const method = request.method;
  return { ip, method };
}
Use code with caution.

Summary for 2026
Avoid @Req() where possible to keep controllers cleaner.
Use @Headers() for auth tokens and metadata.
Use Custom Decorators for user, roles, or account_id to make your route handlers more readable and easier to unit test.



Combining decorators with guards and pipes:-
In NestJS, combining Decorators, Guards, and Pipes creates a powerful "processing pipeline" for your requests. They execute in a specific order to ensure that by the time your Controller code runs, the data is authorized, validated, and transformed.
1. The Execution Order
When a request hits an endpoint, NestJS processes it in this strict sequence:
Guards: "Can this user access this?" (Authentication/Authorization)
Pipes: "Is the data correct and in the right format?" (Validation/Transformation)
Controller Method: "Now perform the business logic."
2. Practical Example: Updating a User Profile
In this scenario, we use a Guard to check the JWT, a Custom Decorator to get the user ID from that JWT, and a Pipe to validate the incoming update data.
typescript
@Patch('update-profile')
@UseGuards(JwtAuthGuard) // 1. GUARD: Checks if token is valid
@UsePipes(new ValidationPipe({ whitelist: true })) // 2. PIPE: Validates the Body
async updateProfile(
  @GetUser('id') userId: string, // 3. CUSTOM DECORATOR: Extracts ID from Request
  @Body() updateDto: UpdateUserDto // 4. PIPE: Validates against DTO rules
) {
  return this.userService.update(userId, updateDto);
}
Use code with caution.

3. Why Combine Them?
Guards + Custom Decorators
Guards usually attach data to the request object (like request.user). Combining them with a custom decorator allows you to extract that data cleanly.
Guard: Verifies the token and attaches the user object to the request.
Decorator: Picks the user or userId out of the request so the controller doesn't have to look for it.
Pipes + Decorators
Pipes can be applied directly to the values extracted by decorators.
Decorator: Grabs a value (like @Param('id')).
Pipe: Immediately converts it (like ParseIntPipe).
Result: findOne(@Param('id', ParseIntPipe) id: number)—the controller receives a clean number, not a string.
4. Advanced Strategy: Composition (Decorator Composition)
If you find yourself using the same three decorators on every route, you can combine them into one single custom decorator to keep your code DRY (Don't Repeat Yourself).
typescript
// auth.decorator.ts
import { applyDecorators, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

export function Auth(role: string) {
  return applyDecorators(
    SetMetadata('role', role),
    UseGuards(JwtAuthGuard, RolesGuard),
    UsePipes(new ValidationPipe({ transform: true })),
  );
}

// Usage in Controller
@Post('admin-action')
@Auth('admin') // Replaces 3-4 separate lines of decorators
createAction() { ... }
Use code with caution.

Summary Table for 2026
Feature	Role	If it fails...
Guard	Gatekeeper	Returns 401 Unauthorized or 403 Forbidden.
Pipe	Quality Control	Returns 400 Bad Request.
Decorator	Data Extractor	Controller gets undefined or a partial object.
By combining these, your Controller stays extremely "thin," focusing only on calling the correct Service methods rather than checking permissions or parsing strings.



Reusability and clean controller design:-
In NestJS, achieving a "thin controller" is the hallmark of a senior developer. By the start of 2026, the industry standard is to treat the Controller purely as a traffic coordinator, moving all "logic" into Guards, Pipes, and Services.
Here is how to use the features we've discussed to maximize reusability and maintain clean code.
1. Use Custom Decorators to "Hide" Request Logic
Don't let your controller methods deal with the Request object. If you need a specific piece of data (like a User ID or a Tenant ID in a multi-tenant app), extract it via a decorator.
Bad Design (Messy):
typescript
@Post()
create(@Req() req: any) {
  const userId = req.user.sub; // Controller knows too much about the request structure
  return this.service.create(userId, req.body);
}
Use code with caution.

Clean Design (Reusable):
typescript
@Post()
create(@ActiveUserId() userId: string, @Body() dto: CreateDto) {
  return this.service.create(userId, dto); // Controller only cares about data
}
Use code with caution.

2. Compose Decorators (The "Power" Decorator)
If you find yourself repeating the same 3 or 4 decorators (e.g., @UseGuards, @ApiBearerAuth, @Roles) on every single method, use applyDecorators to create a single reusable annotation.
typescript
// auth.decorator.ts
export function Authorized(role: string = 'user') {
  return applyDecorators(
    Role(role),
    UseGuards(JwtAuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiResponse({ status: 403, description: 'Forbidden.' }),
  );
}

// In Controller:
@Authorized('admin') // Clean, readable, and reusable
@Post()
deleteUser() { ... }
Use code with caution.

3. Leverage Global and Grouped Pipes
Instead of applying ValidationPipe to every method, apply it globally in main.ts or at the Controller level. This ensures consistency across all endpoints without manual repetition.
Global: app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
Benefits: This automatically strips out any properties in the request body that are not defined in your DTO, preventing "mass assignment" security vulnerabilities.
4. Standardize Response Shapes with Interceptors
While Pipes handle input, Interceptors handle output. Do not format your JSON responses inside the controller. Use an Interceptor to wrap all responses in a standard structure (e.g., { data: T, timestamp: string }).
5. The "Clean Controller" Checklist
To ensure your code remains maintainable in 2026, verify each controller method against these rules:
No if/else logic: Business logic belongs in the Service.
No Data Transformation: Moving strings to numbers or objects belongs in a Pipe.
No Permission Checks: Determining if a user "owns" a resource belongs in a Guard or an Interceptor.
One-Line Body: Ideally, your controller method should just be return this.service.method(params);.
Summary of Benefits
Feature	Benefit to Reusability
Custom Decorators	Decouples the controller from the underlying HTTP platform (Express/Fastify).
Pipes	Ensures that the Service always receives valid, correctly-typed data.
Guards	Separates security concerns from business logic.
ApplyDecorators	Reduces "decorator hell" and ensures standardized security/documentation.












