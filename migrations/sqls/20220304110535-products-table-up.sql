Create Table IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  price INTEGER,
  category VARCHAR(100)
);