// const mysql = require('mysql2');
import { createOrderId } from './server-utils.mjs';

// import mysql from 'mysql2';
import mysql from 'mysql2/promise';


function createDbConnection() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Xenon5555',
    database: 'dea_cosmetics_store'
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
      .json({ Success: false, data: error, from: ".query" });
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
      .json({ Success: false, data: error, from: ".connect" });
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

    const { deliveryDetails, orderDetails, orderQuantity, orderTotal, paymentDetailsId } = req.body;
    const { firstName, lastName, phoneNumber, email, country, region, address, zip} = deliveryDetails;
    const orderId = createOrderId();
  
    console.log({deliveryDetails}, {orderDetails}, {orderTotal}, {orderQuantity}, {paymentDetailsId}, {orderId});
  
    try {
      // insert order details without the deliver_id
      const query = `
        INSERT INTO orders (order_id, total_amount, total_quantity, email, payment_id)
        VALUES (?, ?, ?, ?, ?)
      `;
      await connection.execute(query, [orderId, orderTotal, orderQuantity, email, paymentDetailsId]); 

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

      // insert update delivery_id for the order
      const query3 = `
        UPDATE orders
        SET orders.delivery_id = (
          SELECT delivery_id FROM delivery_details
          WHERE delivery_details.order_id = ?
        ), orders.order_status = ?
        WHERE orders.order_id = 
      `;
      await connection.execute(query3, [orderId, 'Placed', orderId]);

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
    return res
    .status(500)
    .json({ Success: false, data: error, from: ".connect" });
  }
}


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