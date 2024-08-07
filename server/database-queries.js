// const mysql = require('mysql2');

import mysql from 'mysql2';

function createDbConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Xenon5555',
    database: 'dea_cosmetics_store'
  });
}


export function getAllProducts(res) {
  const connection = createDbConnection();
  try {
    connection.connect((err) => {
      if (err) {
        console.log('Error connecting to database:', err);
        return res
        .status(500)
        .json({ Success: false, data: err, form: ".connet" });
      }
      console.log('Connected to database!');
    
      const query = 'SELECT * FROM products';
      connection.query(query, (err, products, fields) => {
        if (err) {
          console.error('Error executing query:', err);
          return res
          .status(500)
          .json({ Success: false, data: err, from: ".query" });
        }
    
        // console.log(products);

        return res
        .status(200)
        .json({ Success: true, data: products });
      });
    });
  } catch (error) {
    return res
    .status(500)
    .json({ Success: false, data: error, from: ".query" });
  }
}


export function addNewsletterSubscriber(req, res) {
  const connection = createDbConnection();
  const { email } = req.body;
  // const email = req.body.email;
  console.log(email);

  // /*
  // const email = 'ibaladeveloper@gmail.com';
  try {
    connection.connect((err) => {
      if (err) {
        console.log('Error connecting to database:', err);
        return res
        .status(500)
        .json({ Success: false, data: err, from: ".connect" });
      }
      console.log('Connected to database!');
      

      // check if subscriber exists
      const query = `
        SELECT EXISTS (
        SELECT 1 FROM newsletter_subscribers
        WHERE email = ?
        )
        AS Result;
      `;
      connection.query(query, [email], (err, response, fields) => {
        if (err) {
          console.error('Error executing query:', err);
          return res
          .status(500)
          .json({ Success: false, data: err, from: ".query"});
        } 
        else if (response[0].Result === 1) {
          return res
          .status(200)
          .json({ Success: true,  data: 'Exists'});
        } 
        // if it doesn't, we add it
        else if (response[0].Result === 0) {
          const query = `
            INSERT INTO newsletter_subscribers
            VALUES (?)
          `;
          connection.query(query, [email], (err, response, fields) => {
            if (err) {
              console.error('Error executing query:', err);
              return res
              .status(500)
              .json({ Success: false, data: err, from: ".query"});
            }
            return res
            .status(200)
            .json({ Success: true,  data: 'Added' });
          });
        }
      });
    });
  } catch (error) {
    return res
    .status(500)
    .json({ Success: false, data: error, from: ".connect" });
  }
  // */
}


// module.exports = { getAllProducts };