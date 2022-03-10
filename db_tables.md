## Database Schema & it's related routes

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
| product_id | `INT` | <p>Product ID</p> | No | FK to `id` in `Products` |