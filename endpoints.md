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
| quantity | `Number` | <p>Order quantity</p> |
| status | `String` | <p>Order status</p> |
| user_id | `Number` | <p>User's foreign key for the order</p> |
| product_id | `Number` | <p>Product's foreign key for the order</p> |

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