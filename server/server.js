// const express = require('express');
// const mysql = require('mysql2');
// const { getAllProducts } = require('./database-queries');

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import { getAllProducts, addNewsletterSubscriber, createOrder, getOrder, updateOrder } from './database-queries.js';


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

app.post('/dea/orders', (req, res) => {
  createOrder(req, res);
});
app.put('/dea/orders', (req, res) => {
  updateOrder(req, res);
});
app.get('/dea/orders', (req, res) => {
  getOrder(req, res);
});


app.listen(5000, () => {
  console.log('Server listening on PORT 5000');
});