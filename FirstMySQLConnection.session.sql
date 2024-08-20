-- show databases;

use dea_cosmetics_store;
show tables;

SELECT * FROM products;


CREATE TABLE newsletter_subscribers (
  email VARCHAR(100)
);

-- SELECT * FROM newsletter_subscribers
-- WHERE email = 'gggggggg';

DESCRIBE newsletter_subscribers;

SELECT * FROM newsletter_subscribers;

DELETE FROM newsletter_subscribers
WHERE email = 'ibalade@gmail.com';

DROP TABLE newsletter_subscribers;


-- USE dea_cosmetics_store;

SELECT FALSE AS Result
WHERE NOT EXISTS (
  SELECT * FROM newsletter_subscribers
  WHERE email = 'ibaladeveloper@gmail.com'
);


-- i used this
SELECT EXISTS (
  SELECT 1 FROM newsletter_subscribers
  WHERE email = 'ibaladeveloper@gmail.com'
  )
AS Result;

SELECT EXISTS (
  SELECT 1 FROM newsletter_subscribers
  WHERE email = 'kofi@gmail.com'
  )
AS Result;



SELECT FALSE AS Result
WHERE 'ffffffff' NOT IN (
  SELECT email FROM newsletter_subscribers
);

INSERT INTO newsletter_subscribers VALUES('ibaladeveloper@gmail.com');



CREATE TABLE orders (
  order_id VARCHAR(10) PRIMARY KEY,
  total_amount INT,
  total_quantity INT,
  email VARCHAR(100),
  order_date DATE,
  order_status VARCHAR(30) DEFAULT 'Placed',
  delivery_id INT,
  payment_id VARCHAR(100)
);

ALTER TABLE orders
MODIFY order_date DATETIME DEFAULT 
CURRENT_TIMESTAMP;

DESCRIBE orders;

CREATE TABLE order_items (
  order_id VARCHAR(10),
  product_id INT,
  quantity INT,
  FOREIGN KEY(order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(product_id) ON DELETE CASCADE
);


DROP TABLE orders;
DROP TABLE orders_items;


CREATE TABLE delivery_details (
  delivery_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id VARCHAR(10),
  first_name  VARCHAR(30),
  last_name  VARCHAR(30),
  email VARCHAR(100),
  ZIP VARCHAR(5) DEFAULT NULL,
  country VARCHAR(30),
  region VARCHAR(30),
  delivery_address VARCHAR(100),
  phone_number VARCHAR(10),
  FOREIGN KEY(order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);


ALTER TABLE orders
ADD FOREIGN KEY(delivery_id) 
REFERENCES delivery_details(delivery_id)
ON DELETE SET NULL;

SHOW tables;
DESCRIBE products;
DESCRIBE orders;
DESCRIBE newsletter_subscribers;
DESCRIBE order_items;
DESCRIBE delivery_details;



INSERT INTO orders (order_id) VALUES ('trying_001');

INSERT INTO delivery_details (order_id, first_name, last_name, email, country, region, delivery_address, phone_number) VALUES
('trying_001', 'Ala', 'Ib', 'trial@email.com', 'Ghana', 'Accra', 'Lakeside', '0577100023');

SELECT delivery_id FROM delivery_details
WHERE order_id = 'trying_001';

INSERT INTO orders (delivery_id) VALUES (
  SELECT delivery_id FROM delivery_details
  WHERE order_id = 'trying_001'
) 
WHERE order_id = 'trying_001';

UPDATE orders
SET delivery_id = (
  SELECT delivery_id FROM delivery_details
  WHERE delivery_details.order_id = 'trying_001'
)
WHERE orders.order_id = 'trying_001';

SELECT * FROM orders;
SELECT * FROM delivery_details;


SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM delivery_details;
DELETE FROM orders; 
DELETE FROM order_items; 
SET FOREIGN_KEY_CHECKS = 1;




UPDATE orders
SET delivery_id = (
  SELECT delivery_id FROM delivery_details
  WHERE delivery_details.order_id = ?
)
WHERE orders.order_id = 'b2d4b1cc80';

SELECT delivery_id FROM delivery_details
WHERE delivery_details.order_id = '5bf170ec0f';

SELECT * FROM orders
WHERE order_id = 'f93a3ceac8';

SELECT * FROM order_items
WHERE order_id = 'f93a3ceac8';

SELECT * FROM delivery_details
WHERE order_id = 'f93a3ceac8';

SELECT * FROM orders;
SELECT * FROM order_items;
SELECT * FROM delivery_details;