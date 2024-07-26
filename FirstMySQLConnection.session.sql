-- show databases;

use dea_cosmetics_store;
show tables;

SELECT * FROM products;


CREATE TABLE newsletter_subscribers (
  email VARCHAR(100)
);

-- SELECT * FROM newsletter_subscribers
-- WHERE email = 'gggggggg';

SELECT * FROM newsletter_subscribers;

DELETE FROM newsletter_subscribers
WHERE email = 'ibalade@gmail.com';


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