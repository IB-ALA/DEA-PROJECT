// const mysql = require('mysql2');

import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Xenon5555',
  database: 'dea_cosmetics_store'
});


export function getAllProducts(res) {

  try {
    connection.connect((err) => {
      if (err) {
        console.log('Error connecting to database:', err);
        return res
        .status(500)
        .json({ Success: false, data: err });
      }
      console.log('Connected to database!');
    
      connection.query('SELECT * FROM products', (err, products, fields) => {
        if (err) {
          console.error('Error executing query:', err);
          return;
        }
    
        // console.log(products);

        return res
        .status(200)
        .json({ Success: true, data: products });
  
        // return { Success: true, data: products };
      });
    });
  } catch (error) {
    return res
    .status(500)
    .json({ Success: false, data: error });
  }
}


// module.exports = { getAllProducts };