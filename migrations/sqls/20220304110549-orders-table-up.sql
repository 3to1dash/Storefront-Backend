Create Table IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  quantity INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  status VARCHAR(64) NOT NULL,

  FOREIGN KEY (user_id)
      REFERENCES users (id),
  FOREIGN KEY (product_id)
      REFERENCES products (id)
);
