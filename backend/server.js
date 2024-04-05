const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:4200', 
};
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
  CREATE TABLE IF NOT EXISTS home_products (\
  id INTEGER PRIMARY KEY AUTOINCREMENT,\
  product_id INT,\
  FOREIGN KEY (product_id) REFERENCES product(id))', (err) => {
    if (err) {
      console.error('Error creating home_products table:', err.message);
    } else {
      console.log('home_products table created successfully');
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
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with your allowed origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS'); // Allow DELETE, POST, GET
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/api/data', (req, res) => {
  data.all('SELECT * FROM data', (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});




  //////////////////////////product//////////////////////////////////////////
  app.post('/api/product', (req, res) => {
    const {
      name,
      description,
      SKU,
      category_id,
      inventory_id,
      price,
      discount_id,
      created_at,
      modified_at,
      deleted_at
  } = req.body;// declare the attributes in the body as required 
    //then i will make the sql command = sql;
    const sql = `
    INSERT INTO product (
      name, description, SKU, category_id, inventory_id, price, discount_id, created_at, modified_at, deleted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [name, description, SKU, category_id, inventory_id, price, discount_id, created_at, modified_at, deleted_at];
    data.run(sql, values, function(err) {
      if (err) {
          console.error('Error inserting product:', err.message);
          return res.status(500).send(err.message); // Send an error response
      }

    const productid = this.lastID;
    data.get('SELECT * FROM product WHERE id = ?', [productid], (err, row) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      res.status(201).json(row);
    });
  })
  });
  app.get('/api/product', (req, res) => {
    // SQL query to select all products
    const productId = req.query.id;
    if (productId) {//if given an id we will return a single product with the given id 
      const sql = `
          SELECT *
          FROM product 
          WHERE id = ?
      `;
      data.get(sql, [productId], (err, row) => { 
          if (err) {
              console.error('Error retrieving product:', err.message);
              return res.status(500).send(err.message);
          }
          if (!row) {
              return res.status(404).send('Product not found');
          }
          res.status(200).json(row);
      });
    }
      else{//else we will return all products
    const sql = `
    SELECT *
    FROM product
    `;
    data.all(sql, [], (err, rows) => { 
        if (err) {
            console.error('Error retrieving products:', err.message);
            return res.status(500).send(err.message);
        }
        if (rows.length === 0) {
            return res.status(404).send('No products found');
        }
        res.status(200).json(rows);
    });
      }
});
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////// home-products ////////////////////////////////////////////////////////
app.post('/api/home-products', (req, res) => {
  const { product_id } = req.body; // Assuming product_id is sent in the request body

  // Perform the database insertion operation
  const sql = `
    INSERT INTO home_products (product_id)
    VALUES (?)
  `;
  data.run(sql, [product_id], function(err) {
    if (err) {
      console.error('Error inserting into home_products:', err.message);
      return res.status(500).send('Failed to add product to home products');
    }//status 500 means internal server error 
    console.log('Product added to home products');
    res.status(201).send('Product added to home products');
    //http status code 201 means Created. "send" will send a response back to the client with a specified payload
  });
});

//use the get request to get disired information. this is using express.js
app.get('/api/home-products', (req, res) => {//will use sql commands to get the information needed. select all in home_products
  const sql = `
  SELECT p.id, p.name, p.description, p.price
  FROM home_products hp
  JOIN product p ON hp.product_id = p.id
  `;
  data.all(sql, [], (err, rows) => { 
      if (err) {
          console.error('Error retrieving home products:', err.message);
          return res.status(500).send(err.message);
      }
      if (rows.length === 0) {
          return res.status(404).send('No home products found');
      }
      res.status(200).json(rows);
  });
});


  //////////////////////////////////////product category/////////////////////////////
  app.post('/api/product_category', (req, res) => {
    const {
      name,
      description,
      created_at,
      modified_at,
      deleted_at
  } = req.body;

  const sql = `
  INSERT INTO product_category (
    name, description, created_at, modified_at, deleted_at
  ) VALUES (?, ?, ?, ?, ?)
`;
const values = [name, description, created_at, modified_at, deleted_at];

data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM product_category WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
    });
  });
})
///////////////////////////product_inventory////////////////////////////////////////////
app.post('/api/product_inventory', (req, res) => {
  const {
    quantity,
    description,
    created_at,
    modified_at,
    deleted_at
} = req.body;
const sql = `
  INSERT INTO product_inventory (
    quantity, description, created_at, modified_at, deleted_at
  ) VALUES (?, ?, ?, ?, ?)
`;
const values = [quantity, description, created_at, modified_at, deleted_at];

data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM product_inventory WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
    });
  });
})

/////////////////////////////////////////////discount //////////////////////////////////////
app.post('/api/discount', (req, res) => {
  const {
    name,
    description,
    discount_precent,
    active,
    created_at,
    modified_at,
    deleted_at
} = req.body;
const sql = `
  INSERT INTO discount (
    name,description,discount_precent,active,created_at,modified_at,deleted_at
  ) VALUES (?, ?, ?, ?, ?,? , ?)
`;
const values = [ name,description,discount_precent,active,created_at,modified_at,deleted_at];

data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM discount WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
    });
  });
})

//////////////////////////order detials ////////////////////////////////////////
app.post('/api/order_details', (req, res) => {
  const {
    user_id,
    total,
    payment_id,
    created_at,
    modified_at
  } = req.body;
  const sql = `
  INSERT INTO order_details (
    user_id, total, payment_id, created_at, modified_at
  ) VALUES (?, ?, ?, ?, ?)
`;
const values = [user_id, total, payment_id, created_at, modified_at];


 // console.log(req.body);//error checking 
 data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM order_details WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
  });
});
});

////////////////////////////////order items///////////////////////////////////////////
app.post('/api/order_items', (req, res) => {
  const {
    order_id, 
    product_id, 
    quantity,
    created_at,
    modified_at
  } = req.body;
  const sql = `
  INSERT INTO order_items (
    order_id, product_id, quantity, created_at, modified_at
  ) VALUES (?, ?, ?, ?, ?)
`;
const values = [order_id, product_id, quantity, created_at, modified_at];
 // console.log(req.body);//error checking 
 data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM order_items WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
  });
});
});
  /////////////////////////////////////user ////////////////////////////////
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
    INSERT INTO users (
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
///////////////////////////////shopping details /////////////////////////////
app.post('/api/shopping_session', (req, res) => {
  const {
    user_id,
    total,
    created_at,
    modified_at
  } = req.body;
  
  const sql = `
  INSERT INTO shopping_session (
    user_id, total, created_at, modified_at
  ) VALUES (?, ?, ?, ?)
`;
const values = [user_id, total, created_at, modified_at];

 data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM shopping_session WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
  });
});
});
///////////////////////////////// cart_items  //////////////////////////////////////////

app.post('/api/cart_item', (req, res) => {
  const {
    session_id,
    product_id,
    quantity,
    created_at,
    modified_at
  } = req.body;
  
  const sql = `
  INSERT INTO cart_item (
    session_id, product_id, quantity, created_at, modified_at
  ) VALUES (?, ?, ?, ?, ?)
`;
const values = [session_id, product_id, quantity, created_at, modified_at];

 data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM shopping_session WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
  });
});
});
app.get('/api/cart_item', (req, res) => {
  const sql = `
  SELECT cart_item.*, product.name AS product_name, product.price, product.description
  FROM cart_item
  JOIN product ON cart_item.product_id = product.id
  `;
  data.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(200).json(rows);
  });
});
app.delete('/api/cart_item/:id',(req, res) => {
  console.log('Cart item deleted successfully');
  const cartItemId = req.params.id;
  const sqlDelete = `
    DELETE FROM cart_item
    WHERE id = ?
  `;

  data.run(sqlDelete, [cartItemId], (err) => {
    if (err) {
      console.error('Error deleting cart item:', err);
      return res.status(500).send(err.message);
    }
    console.log('Cart item deleted successfully');
    res.status(200).json({ message: 'Cart item deleted successfully.' });
  });
});


/////////////////////////////////////////////// payment_details ////////////////////////////////////////////////////////
app.post('/api/payment_details', (req, res) => {
  const {
    order_id,
    amount,
    provider,
    status,
    created_at,
    modified_at
  } = req.body;
  
  const sql = `
  INSERT INTO payment_details (
    order_id, amount, provider, status, created_at, modified_at
  ) VALUES (?, ?, ?, ?, ?, ?)
`;
const values = [order_id, amount, provider, status, created_at, modified_at];

 data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM payment_details WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
  });
});
});

////////////////////////////////////user address //////////////////////////////////////////////////
app.post('/api/user_address', (req, res) => {
  const {
    user_id,
    address_line1,
    address_line2,
    city,
    postal_code,
    country,
    telephone,
    mobile
  } = req.body;
  
  const sql = `
  INSERT INTO user_address (
    user_id, address_line1, address_line2, city, postal_code, country, telephone, mobile
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`;
const values = [user_id, address_line1, address_line2, city, postal_code, country, telephone, mobile];

 data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  const Id = this.lastID;
  data.get('SELECT * FROM user_address WHERE id = ?', [Id], (err, row) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    // Send the response with the fetched data
    res.status(201).json(row);
  });
});
});
//////////////////////////////////////user payment////////////////////////////////
app.post('/api/user_payment', (req, res) => {
  const {
    user_id,
    payment_type,
    provider,
    account_no,
    expire
  } = req.body;
  
  const sql = `
  INSERT INTO user_payment (
    user_id, payment_type, provider, account_no, expire
  ) VALUES (?, ?, ?, ?, ?)
`;
const values = [user_id, payment_type, provider, account_no, expire];

 data.run(sql, values, function (err) {
  if (err) {
    return res.status(500).send(err.message);
  }
  res.status(201).send("User payment added successfully");
 
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
    