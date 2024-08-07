// const express = require('express');
// const mysql = require('mysql2');
// const { getAllProducts } = require('./database-queries');

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { addNewsletterSubscriber, getAllProducts } from './database-queries.js';


// mysql2/promise style.
/*
(async () => {
  try {
    await connection.connect();
    console.log('Connected to database!');

    const [rows, fields] = await 
    connection.execute('SELECT * FROM products');
    console.log(rows);

  } catch (error) {
    console.log('Error connecting to database:', error);
  }
})();
*/


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get('/dea/products', async (req, res) => {
  getAllProducts(res);
});

app.post('/dea/newsletter', (req, res) => {
  addNewsletterSubscriber(req, res);
});


app.listen(5000, () => {
  console.log('Server listening on PORT 5000');
});