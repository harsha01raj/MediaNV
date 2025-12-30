What middleware is and how it works?
Middleware act as middle man which come in between api calls and perform a specific task like verification and authentication. When a user hit on any api's or router before processing if we want to verify or authenticate the 
user then we can use middlewares or not only verification if you can to perform any task before processsing we can use middle ware.


Built-in middleware (express.json, express.urlencoded)

There are multiple built-in middleware like express.json and express.urlencoded

Express.json:- This middleware used when we use post method to send a json data to the server in that case express will not parse the json data by itshelf. That why express have one inbuilt middlware i.e. express.json that is used to parse each and every input data.

Express.urlencoded:-This middle ware is use to parse the url and convert the url data in to key value pair and store in body.

Custom middleware creation:-
In node js with express you can create custome middleware according to your requireent for this you can create a folder for middleware and create a file inside that create a function and in function params pass three data req, res and next. Req and res is use to get and send the data next() is use to contiue the api calls.


Third-party middleware (e.g., cors, morgan)
In node there are multiple third-party middle ware like cors and morgan.
cors: This third party middle ware is use to allowed fronted to access backend with this you can't use backend url in you frontend part.

Morgan:-Morgan is a logging middleware for Express.js.
Its main use is to log HTTP requests coming to your server, which helps in debugging, monitoring, and tracking API usage.


Request lifecycle and middleware chaining:-
The request lifeCycle is the journey a request takes from the client to the server and back as a response.
lifecycle Steps:-
Client
Request sent(Http)
Express App
Middleware
Route Handler
Response sent
Client


Error-handling middleware:-Error-handling middleware is a special type of middleware used to catch, handle, and respond to errors that occur during the request lifecycle in an Express application.


Authentication/authorization middleware (intro):-
Authentication checks identity
Authorization checks permissions
Both are implemented using middleware
req.user is commonly used to share user info


Local component state using useState:-
UseState works the same as React
Next.js components are server by default
Add "use client" to use local state
State is component-scoped and client-side

What are Side Effects?

Examples of side effects:
Fetching data from an API
Updating the document title
Setting timers (setTimeout, setInterval)
Subscribing / unsubscribing to events
Logging
Direct DOM manipulation

Lifting state up and prop drilling:-
Lifting state:-Lifting state up means moving state to the nearest common parent so that child components can share it.
PropDrilling:-Prop drilling is passing props through multiple component levels even when intermediate components don’t need them


What is Context API?
Context API allows you to create a global data store and access it directly from any component without passing props manually.


What is Server State?
Server state is data that:
Lives on the server
Is fetched from an API / database
Can change outside your app
Is often shared by many users

What is Client State?
Client state is data that:
Lives in the browser
Controls UI behavior
Is temporary
Affects only the current user


Intro to state patterns in App Router:-
In Next.js App Router, state management is different from traditional React because components are Server Components by default.
So state is managed using clear patterns, depending on where the data lives and how it changes.