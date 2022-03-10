# Storefront Backend Project

## Getting Started

1. To install required dependencies run `yarn`

2. Update the variables in `.env` && `.env.test` according to your needs

## Setup for development
1. To run the development docker container

    $ npm run docker:up

2. To run the development migrations

    $ npm run db:up

3. To run build and run the server

    $ npm run server

After finishing testing the api run:

4. To drop the development database

    $ npm run db:drop

5. To stop and remove the development docker container

    $ npm run docker:down

## API Endpoints

To check the api endpoints [endpoints.md](./endpoints.md.md).

## DB Schema

To check the database tables [db_tables.md](./db_tables.md).

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
1. To run the development docker container

    $ npm run docker:test:up

2. To run build and run the server

    $ npm run server:test

3. To run the test Suites

    $ npm run test

After finishing testing the api run:

4. To stop and remove the testing docker container

    $ npm run docker:test:down