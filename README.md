# node-auth-jwt
Node, express, mongoDB, mongoose, passport and JWT REST API authentication

Before run this example, make sure you have installed and running MongoDB on your local system
## Configuration

Make sure to add your own Configuration for mongoDB in file location `src/config/main.js`.

```javascript
module.exports = {
    'secret':'putsomesecretcodehere',
    'database':'mongodb://127.0.0.1:27017/node-auth-jwt'
};
```

## Quick Start

```javascript
// Install dependencies 
npm install

// Run server 
npm start
or
npm run start:dev //watch mode

// Server runs on http://localhost:3000
```

## Sample Request : 
- Signup : 
    ```
    POST /api/auth/signup HTTP/1.1
    Host: localhost:3000
    Content-Type: application/x-www-form-urlencoded
    User-Agent: PostmanRuntime/7.18.0
    Accept: */*
    Cache-Control: no-cache
    Postman-Token: c298eeab-f2c6-4f37-baff-1830d9650bc7,27540db5-b18f-4992-9bfc-46429c1a3886
    Host: localhost:3000
    Accept-Encoding: gzip, deflate
    Content-Length: 85
    Connection: keep-alive
    cache-control: no-cache

    first_name=Anand&last_name=Mahajan&email=anandmahajan267@gmail.com&password=test123
    ```
 - Login 
 ```
    POST /api/auth/login HTTP/1.1
    Host: localhost:3000
    Content-Type: application/x-www-form-urlencoded
    User-Agent: PostmanRuntime/7.18.0
    Accept: */*
    Cache-Control: no-cache
    Postman-Token: 43bdfbf4-eb22-4917-8316-1abcb391dad5,687d790e-31eb-40c3-8bd2-77d1f003a3e0
    Host: localhost:3000
    Accept-Encoding: gzip, deflate
    Content-Length: 50
    Connection: keep-alive
    cache-control: no-cache

    email=anandmahajan267@gmail.com&password=test123
 ```

- Check User ID using JWT Token :
```
    GET /api/home/dashboard HTTP/1.1
    Host: localhost:3000
    Authorization: JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQ2xpZW50IiwiX2lkIjoiNWRiNmM0MzVlMzc4NmYyYTAwNWJjNjFhIiwiZmlyc3RfbmFtZSI6IkFuYW5kIiwibGFzdF9uYW1lIjoiTWFoYWphbiIsImVtYWlsIjoiYW5hbmRtYWhhamFuMjY3QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDBWOW54bVJERkRvS3ZqNFFiZW8uY09VRDE2SGs2b1F3Nmk4cmxRWUhDYW53aWx2YTNlRWZxIiwiX192IjowLCJpYXQiOjE1NzIyNjY2MTgsImV4cCI6MTU3MjI2NzYxOH0.RWHwA2l4oFF02cBhnIIXlN6cWBnrdtlDAaE1akI6158
    cache-control: no-cache
    Postman-Token: e50528a2-a039-452a-912e-ccddcb9b8e7a

```
