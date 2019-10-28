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
