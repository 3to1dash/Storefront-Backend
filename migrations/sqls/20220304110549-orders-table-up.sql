Create Table IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  status VARCHAR(64),

  FOREIGN KEY (user_id)
      REFERENCES users (id),
  FOREIGN KEY (product_id)
      REFERENCES products (id)
);