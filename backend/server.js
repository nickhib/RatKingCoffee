const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

const data = new sqlite3.Database('mydatabase.db');

data.serialize(() => {//set up database tables 
  data.run('\
  CREATE TABLE IF NOT EXISTS product (\
  id INTEGER PRIMARY KEY AUTOINCREMENT,\
   name TEXT,description TEXT,SKU TEXT,\
   category_id INT, inventory_id INT,\
   price DECIMAL, discount_id INT, created_at TEXT DEFAULT CURRENT_TIMESTAMP,\
   modified_at TEXT DEFAULT CURRENT_TIMESTAMP, deleted_at TEXT DEFAULT CURRENT_TIMESTAMP,\
   FOREIGN KEY (category_id) REFERENCES product_category(id),\
   FOREIGN KEY (inventory_id) REFERENCES product_inventory(id),\
   FOREIGN KEY (discount_id) REFERENCES discount(id))', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('product created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS product_category (\
  id INTEGER PRIMARY KEY AUTOINCREMENT,\
   name TEXT,description TEXT,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,\
   modified_at TEXT DEFAULT CURRENT_TIMESTAMP, deleted_at TEXT DEFAULT CURRENT_TIMESTAMP)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('product category created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS product_inventory (\
  id INTEGER PRIMARY KEY AUTOINCREMENT,\
   quantity INT,description TEXT,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,\
   modified_at TEXT DEFAULT CURRENT_TIMESTAMP, deleted_at TEXT DEFAULT CURRENT_TIMESTAMP)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('product inventory created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS discount (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    name TEXT,description TEXT,discount_precent DECIMAL,\
    active BOOLEAN, created_at TEXT DEFAULT CURRENT_TIMESTAMP,\
    modified_at TEXT DEFAULT CURRENT_TIMESTAMP, deleted_at TEXT DEFAULT CURRENT_TIMESTAMP)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('discount created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS order_details (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    user_id TEXT UNIQUE,total DECIMAL,payment_id INT,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,modified_at TEXT DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (user_id) REFERENCES user(id),\
    FOREIGN KEY (payment_id) REFERENCES payment_details(id))', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('order_details created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS order_items (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    order_id INT,product_id INT,quantity INT,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,modified_at TEXT DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (product_id) REFERENCES product(id),\
    FOREIGN KEY (order_id) REFERENCES order_details(id))', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('order_items created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS user (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    username TEXT,password TEXT,first_name DECIMAL,\
    last_name TEXT, telephone INT,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,modified_at TEXT DEFAULT CURRENT_TIMESTAMP)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('users created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS shopping_session (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    user_id TEXT,total DECIMAL,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,modified_at TEXT DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (user_id) REFERENCES user(id))', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('shopping session created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS cart_item (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    session_id INT,product_id INT, quantity INT,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,modified_at TEXT DEFAULT CURRENT_TIMESTAMP,\
    FOREIGN KEY (product_id) REFERENCES product(id),\
    FOREIGN KEY (session_id) REFERENCES shopping_session(id))', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('cart_items created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS payment_details (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    order_id INT,amount INT, provider TEXT,status TEXT,\
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,modified_at TEXT DEFAULT CURRENT_TIMESTAMP)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('payment details created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS user_address (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    user_id INT,address_line1 TEXT, address_line2 TEXT,city TEXT,\
    postal_code TEXT, country TEXT, telephone TEXT, mobile TEXT)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('user address created successfully.');
    }
  });
  data.run('\
  CREATE TABLE IF NOT EXISTS user_payment (\
    id INTEGER PRIMARY KEY AUTOINCREMENT,\
    user_id INT,payment_type TEXT, provider TEXT,account_no INT,\
    expire DATE)', (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('user payment created successfully.');
    }
  });
});

app.use(express.json());

app.get('/api/data', (req, res) => {
  data.all('SELECT * FROM data', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});




  //console.log(req.body);//error checking 
  app.post('/api/product', (req, res) => {



  });
  app.post('/api/user', (req, res) => {
    const {
      username,
      password,
      first_name,
      last_name,
      telephone,
      created_at,
      modified_at
    } = req.body;
    if (!username || !password || !first_name || !last_name || !telephone || !created_at || !modified_at) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }
    const sql = `
    INSERT INTO products (
      username, password, first_name, last_name, telephone, created_at, modified_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [username, password, first_name, last_name, telephone, created_at, modified_at];

  
   // console.log(req.body);//error checking 
   data.run(sql, values, function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    const newUserId = this.lastID;
    data.get('SELECT * FROM users WHERE id = ?', [newUserId], (err, row) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      // Send the response with the fetched data
      res.status(201).json(row);
    });
  });
});


const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  console.log('Closing the server and database connection...');
  server.close(() => {
    data.close((err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Closed the database connection.');
        process.exit(0);
      }
    });
  });
});

    /*Database.close() or close([callback])
    callback (optional): If provided, this function will be called when the database was closed successfully or when an
    error occurred. The first argument is an error object. When it is null, closing succeeded.
    If no callback is provided and an error occurred, an error event with the error object as
    the only parameter will be emitted on the database object. If closing succeeded,
    a close event with no parameters is emitted, regardless of whether a callback was provided or not.
    */
    