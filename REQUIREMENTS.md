# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Endpoints
### Authentication
#### Generate a JWT

```
POST /auth
```

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| username | `String` | <p>User firstname</p> |
| password | `String` | <p>User password</p> |

### Users Endpoints
#### Create User

```
POST /users
```

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| firstname | `String` | <p>User firstname</p> |
| lastname | `String` | <p>User lastname</p> |
| password | `String` | <p>User password</p> |

#### Get User

```
GET /users/:id
```

#### Headers

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Authorization | `String` | <p>User jwt obtained from /auth endpoint</p> |

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>User id</p> |

#### Get All Users

```
GET /users
```

#### Headers

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Authorization | `String` | <p>User jwt obtained from /auth endpoint</p> |

### Products Endpoints
#### Create Product

```
POST /products
```
#### Headers

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Authorization | `String` | <p>User jwt obtained from /auth endpoint</p> |

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| name | `String` | <p>Product name</p> |
| price | `Number` | <p>Product price</p> |
| category | `String` | <p>Product category</p> |

#### Get Product

```
GET /products/:id
```
#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| id | `String` | <p>Product id</p> |

#### Get All Product

```
GET /products
```
### Orders Endpoints
#### Create Order

```
POST /orders
```
#### Headers

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Authorization | `String` | <p>User jwt obtained from /auth endpoint</p> |

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| status | `String` | <p>Order status</p> |
| user_id | `Number` | <p>User's foreign key for the order</p> |

#### Add products to the order

```
POST /orders/:id/products
```
#### Headers

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Authorization | `String` | <p>User jwt obtained from /auth endpoint</p> |

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| quantity | `Number` | <p>Order quantity</p> |
| order_id | `Number` | <p>Order id</p> |
| product_id | `Number` | <p>Product id</p> |

#### Get all orders by user

```
GET /orders/user/:user_id
```
#### Headers

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Authorization | `String` | <p>User jwt obtained from /auth endpoint</p> |

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user_id | `Number` | <p>Order's user id</p> |

#### Get all orders by user and status

```
GET /orders/:status/user/:user_id
```
#### Headers

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| Authorization | `String` | <p>User jwt obtained from /auth endpoint</p> |

#### Parameters

| Name     | Type       | Description                           |
|----------|------------|---------------------------------------|
| user_id | `Number` | <p>Order's user id</p> |
| status | `String` | <p>Order status</p> |

## Data Shapes
### Database Schema & it's related routes

### Users

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| id | `SERIAL` | <p>User Id</p> | No | Primary Key & Unique |
| password_digest | `VARCHAR` | <p>User's hashed password</p> | No | None |
| firstname | `VARCHAR(64)` | <p>User's First name</p> | No | None |
| lastname | `VARCHAR(64)` | <p>User's Last name</p> | No | None |

### Products

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| id | `SERIAL` | <p>Product Id</p> | No | Primary Key & Unique |
| name | `VARCHAR(100)` | <p>Product name</p> | No | None |
| price | `INT` | <p>Product Price</p> | No | None |
| category | `VARCHAR(100)` | <p>Product category</p> | Yes | None |

### Orders

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| id | `SERIAL` | <p>Order Id</p> | No | Primary Key & Unique |
| status | `VARCHAR(64)` | <p>Order Status</p> | No | None |
| user_id | `INT` | <p>User ID</p> | No | FK to `id` in `Users` |

### Order_Products

| Column   | Type       | Description | Nullable | Constraint                  |
|----------|------------|-------------|----------|-----------------------------|
| id | `SERIAL` | <p>Order_Product Id</p> | No | Primary Key & Unique |
| quantity | `INT` | <p>Product quantity</p> | No | None |
| product_id | `INT` | <p>Product ID</p> | No | FK to `id` in `Products` |
| order_id | `INT` | <p>Order ID</p> | No | FK to `id` in `Orders` |