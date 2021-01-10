# **From the book Design Patterns for Express.js**

To use the code clone the repo and run
` npm install` to install the necessary dependencies.

You will also need to `npm install dotenv ` and create a file called `.env` in the root directory of the project.

It should contain one line ` SIGNATURE=1m_s3cure` with no quotes. This is for sigining the authorization bearer tokens found in lib directory

To start the server run ` npx nodemon index.js`

Use an API Dev tool like Postman, Insomnia REST Client or Fiddler to test the endpoints.

They can be found in the routes directory and are

Step 1

- POST localhost:3000/tokens - this is to create a jwt bearer token
  - use user 1 { "username": "nybblr", "password": "alps" } as the json body
  - then copy this token and use it for the jwt token bearer token in the request header when making all other requests
  - otherwise you will recieve 403 forbidden due to jwt token access.

Step 2: Begin messing around with the api

- GET localhost:3000/users
- GET localhost:3000/users/1
- GET localhost:3000/emails
- GET localhost:3000/emails1
- POST localhost:3000/users
- POST localhost:3000/emails
- PATCH follows as above
- DEELETE follows as above
