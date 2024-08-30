// const mysql = require('mysql2');
import { createOrderId } from './server-utils.mjs';

// import mysql from 'mysql2';
import mysql from 'mysql2/promise';
import ejs from 'ejs';
import { sendEmail } from './nodemailor.mjs';
import dotenv from 'dotenv';
dotenv.config(); 


function createDbConnection() {
  return mysql.createConnection({
    host: process.env.DATABASE_ROOT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  });
}

export async function getAllProducts(res) {
  try {
    const connection = await createDbConnection();
    console.log('Connected To DB Successfully');

    const query = 'SELECT * FROM products';
    try {
      const [products] = await connection.execute(query);
      // console.log('Executed SUccessfully');
  
      return res
      .status(200)
      .json({ Success: true, data: products });
    } catch (error) {
      return res
      .status(500)
      .json({ Success: false, data: error, from: ".execute" });
    }
  } catch (error) {
    console.log('Error connecting to database:', error);
    return res
    .status(500)
    .json({ Success: false, data: error, form: ".connect" });
  }
}

export async function addNewsletterSubscriber(req, res) {
  try {
    const connection = await createDbConnection();

    try {
      const { email } = req.body;
      
      // check if subscriber exists
      const query = `
        SELECT EXISTS (
        SELECT 1 FROM newsletter_subscribers
        WHERE email = ?
        )
        AS Result;
      `;
      const [ response, fields ] = await connection.execute(query, [email]);
      if (response[0].Result === 1) {
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
        await connection.execute(query, [email]);
        return res
        .status(200)
        .json({ Success: true,  data: 'Added' });
      }
    } catch (error) {
      return res
      .status(500)
      .json({ Success: false, data: error, from: ".execute" });
    }
  } catch (error) {
    console.log('Error connecting to database:', error);
    return res
    .status(500)
    .json({ Success: false, data: error, form: ".connect" });
  }
}

export async function createOrder(req, res) {
  try {
    const connection = await createDbConnection();
    console.log('Connected to database!');

    const { deliveryDetails, orderDetails, orderQuantity, orderTotal, totalCost } = req.body;
    const { firstName, lastName, phoneNumber, email, country, region, address, zip} = deliveryDetails;
    const orderId = createOrderId();
  
    console.log({deliveryDetails}, {orderDetails}, {orderTotal}, {orderQuantity}, {totalCost}, {orderId});
  
    try {
      // insert order details without the deliver_id
      // total_amount is the orderTotal
      // total_cost is the orderTotal minus discount plus additionalCost
      const query = `
        INSERT INTO orders (order_id, total_amount, total_quantity, email, total_cost)
        VALUES (?, ?, ?, ?, ?)
      `;
      await connection.execute(query, [orderId, orderTotal, orderQuantity, email, totalCost]); 

      orderDetails.forEach(async orderItem => {
        const { productId, quantity } = orderItem;

        const query = `
          INSERT INTO order_items
          VALUES (?, ?, ?)
        `;
        await connection.execute(query, [orderId, Number(productId), quantity ]);
      });

      // insert delivery_details
      const query2 = `
        INSERT INTO delivery_details (order_id, first_name, last_name, email, ZIP, country, region, delivery_address, phone_number)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await connection.execute(query2, [orderId, firstName, lastName, email, zip, country, region, address, phoneNumber]);

      // we will do this after the momo is successfull. use UPDATE method, not post.
      // insert orderStatus and the paymentDetailsId, orderStatus, paymentMethod

      // insert update delivery_id for the order
      const query3 = `
        UPDATE orders
        SET orders.delivery_id = (
          SELECT delivery_id FROM delivery_details
          WHERE delivery_details.order_id = ?
        )
        WHERE orders.order_id = ?
      `;
      await connection.execute(query3, [orderId, orderId]);

      console.log('All data inserted successfully. Order-id: ', orderId);
      return res
      .status(200)
      .json({ Success: true, data: orderId });
    } catch (error) {
      return res
      .status(500)
      .json({ Success: false, data: error, from: ".execute" });
    }
  } catch (error) {
    console.log(error);
    
    return res
    .status(500)
    .json({ Success: false, data: error, from: ".connect" });
  }
}

export async function updateOrder(req, res) {
  const { orderId } = req.query;
  const { paymentDetailsId, orderPlaced } = req.body;
  const { paymentMethod, orderDetails } = orderPlaced;

  try {
    const connection = await createDbConnection();
    console.log('Connected to database!');
  
    // /*
    try {
      // insert order details without the deliver_id
      // total_amount is the orderTotal
      // total_cost is the orderTotal minus discount plus additionalCost
      const query = `
        UPDATE orders
        SET orders.delivery_id = (
          SELECT delivery_id FROM delivery_details
          WHERE delivery_details.order_id = ?
        ), orders.order_status = ?, orders.payment_id = ?, orders.payment_method= ?
        WHERE orders.order_id = ?
      `;
      await connection.execute(query, [orderId, 'Placed', paymentDetailsId, paymentMethod, orderId]);

      let newOrderDetails = [];
      const getAllProductsNameQuery = `
        SELECT products.product_id, products.name, products.price_in_pesewas
        FROM products
      `;
      const [allProducts, fields] = await connection.execute(getAllProductsNameQuery);
      
      for (const orderItem of orderDetails) {
        for (let index = 0; index < allProducts.length; index++) {
          const product = allProducts[index];
          if (Number(orderItem.productId) === product.product_id) {
            newOrderDetails.push({ productName: product.name, quantity: orderItem.quantity, pricePesewas: product.price_in_pesewas })
          }
        }
      }

      orderPlaced.orderDetails = newOrderDetails;

      const today = new Date();
      const minute = today.getMinutes();
      const hour = today.getHours();
      const date = today.getDate();
      const day = today.getDay() === 1 ? 'monday' :  today.getDay() === 2 ? 'tuesday' :  today.getDay() === 3 ? 'wednesday' :  today.getDay() === 4 ? 'thursday' :  today.getDay() === 5 ? 'friday' :  today.getDay() === 6 ? 'saturday' : 'sunday';
      const month = today.getMonth() === 1 ? 'Jan' :  today.getMonth() === 2 ? 'feb' :  today.getMonth() === 3 ? 'Mar' :  today.getMonth() === 4 ? 'Apr' :  today.getMonth() === 5 ? 'May' :  today.getMonth() === 6 ? 'Jun' :  today.getMonth() === 7 ? 'July' :  today.getMonth() === 8 ? 'august' :  today.getMonth() === 9 ? 'Sept' :  today.getMonth() === 10 ? 'oct' :  today.getMonth() === 11 ? 'nov' : 'dec';
      const year = today.getFullYear();
      let finalDate = `${month}, ${day} ${date} ${year}, ${hour}:${minute}`;

      orderPlaced.orderDate = finalDate;
      
      // send email confirmation
      const templateFile = './server/email-template/order-confirmation.ejs';

      ejs.renderFile(templateFile, orderPlaced, (err, html) => {
        if (err) {
          console.log(err);
          
          return res
          .status(500)
          .json({ Success: false, data: { orderId, err }, from: ".execute"});
        }

        const emailDetails = {
          senderEmailAddress: process.env.SENDERS_EMAIL_ADDRESS, 
          senderEmailPassword: process.env.SENDERS_EMAIL_APP_REQUIRED_PASSWORD, 
          recipientEmailAddress: orderPlaced.deliveryDetails.email, 
          emailSubject: 'Order Confirmation', 
          html: html
        }

        sendEmail(emailDetails);
    
        console.log('All data inserted successfully. Order-id: ', orderId);
        return res
        .status(200)
        .json({ Success: true, data: { orderId, html}});
      });
      
    } catch (error) {
      console.log(error);
      
      return res
      .status(500)
      .json({ Success: false, data: error, from: ".execute" });
    }
    // */

  } catch (error) {
    console.log(error);
    
    return res
    .status(500)
    .json({ Success: false, data: error, from: ".connect" });
  }
}

export async function getOrder(req, res) {
  try {
    const connection = await createDbConnection();
    // const orderId = 'e232288417';
    // const email = 'iishaqyusif@gmail.com';
    const { orderId, email } = req.query
    console.log({orderId}, {email});

    let getOrderDetailsQuery;
    let getOrderProductsQuery;
    let queryParam;

    if (orderId) {
      getOrderDetailsQuery = `
        SELECT 
        orders.order_id AS orderId, 
        orders.order_date AS orderDate, 
        orders.order_status AS orderStatus, 
        orders.total_cost AS orderTotal 
        FROM orders
        WHERE orders.order_id = ?
        ORDER BY orders.order_date DESC
      `;

      getOrderProductsQuery = `
        SELECT 
        order_items.order_id AS orderId, 
        order_items.product_id AS productId, 
        order_items.quantity AS quantity
        FROM order_items 
        WHERE order_items.order_id = ?
      `;

      queryParam = orderId;
      console.log('Using orderId');
    } 
    else if (email) {
      getOrderDetailsQuery = `
        SELECT
        orders.order_id AS orderId, 
        orders.order_date AS orderDate, 
        orders.order_status AS orderStatus, 
        orders.total_cost AS orderTotal
        FROM orders
        WHERE orders.order_id IN (
          SELECT orders.order_id 
          FROM orders
          WHERE orders.email = ? AND orders.order_status <> 'Pending'
        )
        ORDER BY orders.order_date DESC
      `;

      getOrderProductsQuery = `
        SELECT 
        order_items.order_id AS orderId, 
        order_items.product_id AS productId, 
        order_items.quantity AS quantity
        FROM order_items
        WHERE order_items.order_id IN (
          SELECT orders.order_id 
          FROM orders
          WHERE orders.email = ? AND orders.order_status <> 'Pending'
        )
      `;
      
      queryParam = email;
      console.log('Using email');
    }

    try {
      const [orderDetails, fields1] = await connection.execute(getOrderDetailsQuery, [queryParam]);
      const [orderProducts, fields2] = await connection.execute(getOrderProductsQuery, [queryParam]);

      const orders = [];
      orderDetails.forEach(({ orderId, orderDate, orderStatus, orderTotal })  => {
        const orderItems = [];
        
        orderProducts.forEach((orderItem) => {
          if (orderItem.orderId === orderId) {
            const { productId, quantity } = orderItem;
            orderItems.push( { productId, quantity });
          }
        });

        orders.push(
          { 
            orderId, 
            orderDate, 
            orderStatus, 
            orderTotal, 
            orderItems
          }
        );
      });

      console.log({orders});

      return res
      .status(200)
      .json({ Success: true, data: {orders} });
    } catch (error) {
      console.log(error);
      return res
      .status(500)
      .json({ Success: false, data: error, from: ".execute" });
    }

  } catch (error) {
    console.log(error);
    return res
    .status(500)
    .json({ Success: false, data: error, from: ".connect" });
  }  
}

// fetch url should look like these; for getting the orders:
// http://localhost:5000/dea/orders?orderId=e232288417
// http://localhost:5000/dea/orders?email=iishaqyusif@gmail.com


// Old mysql2, not promises.
/*
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
  // console.log(email);

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
}


export function createOrder(req, res) {
  const connection = createDbConnection();
  const { deliveryDetails, orderDetails, orderQuantity, orderTotal, paymentDetailsId } = req.body;
  const { firstName, lastName, phoneNumber, email, country, region, address, zip} = deliveryDetails;
  const orderId = createOrderId();

  console.log({deliveryDetails}, {orderDetails}, {orderTotal}, {orderQuantity}, {paymentDetailsId}, {orderId});

  try {
    connection.connect((err) => {
      if (err) {
        console.log('Error connecting to database:', err);
        return res
        .status(500)
        .json({ Success: false, data: err, from: ".connect" });
      }
      console.log('Connected to database!');
    
      // insert order details without the deliver_id
      const query = `
        INSERT INTO orders (order_id, total_amount, total_quantity, email, payment_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      connection.query(query, [orderId, orderTotal, orderQuantity, email, paymentDetailsId], (err, response, fields) => {
        if (err) {
          console.error('Error executing query:', err);
          return res
          .status(500)
          .json({ Success: false, data: err, from: ".query"});
        }

        // insert order items
        orderDetails.forEach(orderItem => {
          const { productId, quantity } = orderItem;

          const query = `
            INSERT INTO order_items
            VALUES (?, ?, ?)
          `;
          connection.query(query, [orderId, Number(productId), quantity ], (err, response, fields) => {
            if (err) {
              console.error('Error executing query:', err);
              return res
              .status(500)
              .json({ Success: false, data: err, from: ".query"});
            }

            // const query = `
            //   INSERT INTO delivery_details (order_id, first_name, last_name, email, ZIP, country, region, delivery_address, phone_number)
            //   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            // `;
            // connection.query(query, [orderId, firstName, lastName, email, zip, country, region, address, phoneNumber], (err, response, fields) => {
            //   if (err) {
            //     console.error('Error executing query:', err);
            //     return res
            //     .status(500)
            //     .json({ Success: false, data: err, from: ".query"});
            //   }

            //   const query = `
            //     UPDATE orders
            //     SET delivery_id = (
            //       SELECT delivery_id FROM delivery_details
            //       WHERE delivery_details.order_id = ?
            //     )
            //     WHERE orders.order_id = ?
            //   `;

            //   connection.query(query, [orderId, orderId], (err, response, fields) => {
            //     if (err) {
            //       console.error('Error executing query:', err);
            //       return res
            //       .status(500)
            //       .json({ Success: false, data: err, from: ".query"});
            //     }

            //     console.log('All data inserted successfully. Order-id: ', orderId);
            //     return res
            //     .status(200)
            //     .json({ Success: true, data: orderId });
            //   });

            // });

          });
        });

        // insert update delivery_id for the order
        (() => {
          const query = `
            INSERT INTO delivery_details (order_id, first_name, last_name, email, ZIP, country, region, delivery_address, phone_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;
          connection.query(query, [orderId, firstName, lastName, email, zip, country, region, address, phoneNumber], (err, response, fields) => {
            if (err) {
              console.error('Error executing query:', err);
              return res
              .status(500)
              .json({ Success: false, data: err, from: ".query"});
            }

            const query = `
              UPDATE orders
              SET delivery_id = (
                SELECT delivery_id FROM delivery_details
                WHERE delivery_details.order_id = ?
              )
              WHERE orders.order_id = ?
            `;
            connection.query(query, [orderId, orderId], (err, response, fields) => {
              if (err) {
                console.error('Error executing query:', err);
                return res
                .status(500)
                .json({ Success: false, data: err, from: ".query"});
              }

              console.log('All data inserted successfully. Order-id: ', orderId);
              return res
              .status(200)
              .json({ Success: true, data: orderId });
            });

          });
        }) ();
      });


    });
  } catch (error) {
    return res
    .status(500)
    .json({ Success: false, data: error, from: ".connect" });
  }
}
// FINISH THE CREATEORDER FUNCTION.
// TRY HANLING SOME OF THE ERRORS

// module.exports = { getAllProducts };
*/