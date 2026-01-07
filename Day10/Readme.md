REST principles and best practices:-

REST= Representational State Transfer.It's an architechture style for designing APIs.

1. Client-Server Separation
. Client (Frontend) and Server (Backend) are independent.
. Client only knows API URLS + responses.
. Server doesn't care how UI looks.

Example:
. React -> calls API
. NestJS -> return JSON

Easy to scale
Easy to change frontend/backend separately.

2. Statelessness
Each request must contain all information needed.

Server should NOT store user session state
Use JWT/tokens instead
GET/users
Authorization: Bearer <token>

Easy scaling
No memory dependency

3. Resource-Based Design
Everything is a resource, indentified by a URL.

/users
/users/10

4. Use HTTP Methods Correctly:-
Method                  Purpose
GET                     Read data
POST                    Create data
PUT                     Update entire resource
PATCH                   Partial update
DELETE                  Remove data

POST /users
GET /users/10
PATCH /users/10
DELETE /users/10

5. Representation of Resources
Resources are represented as JSON(mostly).

{
    "id":10,
    "name":"Harsh",
    "role":"user"
}

6.Uniform interface

API should follow consistent rules

.   Same naming style
.   Same error format
.   Same HTTP methods

REST Best Practices(Very important)

1.  User Nouns, Not Verbs in URLS
2.  Use Proper HTTP Status Codes
    code                    Meaning
    200                     OK
    201                     CREATED
    400                     BAD REQUEST
    401                     UNAUTHORIZED
    403                     FORBIDDEN
    404                     NOT FOUND
    409                     CONFLICT
    500                     SERVER ERROR
3. Version Your APIs
Avoid breaking existing clients
Good:
/api/v1/users
/api/v2/users

4. Filtering, Sorting, Pagination via Query Params
Bad
/users/getByRole/admin
Good
/users?role=admin&sort=asc&page=2

5.Consistent Error Response Format
Good:
{
    "statusCode":400,
    "message":"Email is invalid",
    "error":"Bad Request"
}

6. Use Plural Resource Names
/user
/users


7. Do NOT Return Sensitive Data like passwords,tokens,internal IDs

8. Use idempotency Properly

9. Use Hateoas(Optinal/Advanced);

10. Secure Your API
. HTTPS only
. JWT authentication 
. Rate Limiting
. Input Validation


Route parameters and query parameters:-

1. Route Parameters(Path Params)
Route parameters are part of the URL path. They are usually required and identify a specific resource.
Example URL
GET /users/15
15 is a route Parameter

Query parameters are after ? in the URL. They are optional and control filtering, sorting, pagination, search.
Example URL
GET /users?role=admin&page=2

@Get()
getUsers(
    @Query('role') role:string,
    @Query('page') page:number,
){
    return {role,page}
}

Get All Query Params
@Get()
getUsers(@Query() query:any){
    return query;
}


Route vs Query(Comparison)
Feature     Route Params           Query Params
Location    URL path                After ?
Required    Yes                     Opitonal
Purpose     identify resource       Modify result
Example.    /users/10               /users?page=2

Error handling in REST APIs:-

Good Error handling means:
.   Clear error messages
.   Correct HTTP status codes
.   Consistent response fomat
.   No sensitive data leakage

1. Use Proper HTTP Status Codes
2. Consistent Error Response Format
3. Validation Error(client-side mistakes)
4. Throw Meaningful Exceptions
5. Global Exception Filter
6. Do NOT leak sensitive information
7. Handle Async Errors Properly
8. Centralize Error logic(Service Layer)
9. Logging Errors(Production)
10. Error Handling Flow(Best Practice)
Client Request
   ↓
DTO Validation
   ↓
Service Logic
   ↓
Exception Thrown
   ↓
Global Exception Filter
   ↓
Standard Error Response