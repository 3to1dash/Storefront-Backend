# Storefront Backend Project

## Getting Started

1. To install required dependencies run `yarn`

2. Update the variables in `.env` && `.env.test` with your values

## PORTS

- Dev server port: `3000`

- Dev db port: `5432`

- Test server port: `3000`

- Test db port: `5432`

## Database setup for development
1. **Create user**
``` sh
        Create User 3to1dash With Password '5937865562';
```

2. **Create the development and test databases**
``` sh
        Create database shopfront_api;
        Create database shopfront_api_test;
```

3. **Grant all databases privileges to user in both databases**
``` sh
        Grant All Privileges On Database shopfront_api To 3to1dash;
        Grant All Privileges On Database shopfront_api_test To 3to1dash;
```

## Setup for development

1. To run the development migrations

        $ npm run db:up

2. To run build and run the server

        $ npm run server

After finishing testing the api run:

3. To drop the development database

        $ npm run db:drop

## API Endpoints And DB Tables

To check the api endpoints and the database tables open: [REQUIREMENTS.md](./REQUIREMENTS.md).

## Environment Variables
### Dev

```
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432
    POSTGRES_USER=3to1dash
    POSTGRES_PASSWORD=5937865562
    POSTGRES_DB=shopfront_api
    ENV=dev
    BCRYPT_SECRET=cobalt-giraffe-25
    SALT_ROUNDS=10
    TOKEN_SECRET=manurus2684!
```

### Test

```
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432
    POSTGRES_USER=3to1dash
    POSTGRES_PASSWORD=5937865562
    POSTGRES_DB=shopfront_api_test
    ENV=test
    BCRYPT_SECRET=cobalt-giraffe-25
    SALT_ROUNDS=10
    TOKEN_SECRET=manurus2684!
```

## Steps to run the test suites
1. To run build and run the server

        $ npm run server:test

2. To run the test Suites

        $ npm run test
