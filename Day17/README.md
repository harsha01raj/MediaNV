📖 Swagger API Documentation

To explore and test the backend APIs for this project, you can use the Swagger interface. Swagger provides a user-friendly UI to view all endpoints, their parameters, and responses.

🔗 Swagger URL

Open the following URL in your browser: http://localhost:3001/api


1.	Authorization
	•	Most APIs require authentication using the access token stored in a cookie named token.
	•	Do NOT use the refresh_token cookie for Swagger authorization. Refresh tokens are only used internally for renewing access tokens.
2.	Authorize in Swagger
	•	Click the Authorize button on the top-right of the Swagger UI.
	•	In the token field, paste only the raw JWT access token.
    •	Leave the refresh_token field empty.

3.	Cookie-based Authentication
	•	Ensure your browser allows cookies from the backend domain (localhost:3001).
	•	Swagger will send the token cookie automatically with requests to protected routes.
4.	Refreshing Tokens
	•	The refresh_token is handled internally by the backend.
	•	Do not manually enter it in Swagger for authorization.
5.	CORS & Frontend
	•	If you are using the frontend app (localhost:3000), make sure the backend CORS settings allow credentials: