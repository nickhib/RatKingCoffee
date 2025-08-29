import { getDatabase } from './getDatabase.js';

//reference https://expressjs.com/en/5x/api.html
// helper function
async function setupCartRequest(req) {
  const db = await getDatabase();
  const cartId = req.cookies.cart_id;
  console.log("setup cart", req.cookies.cart_id);
  const {productId, quantity} = req.body;
  if (!productId || !quantity) {
    throw new Error("productId and quantity are required");
  }
  const existingItem = await db.get("SELECT * FROM cart_items WHERE cart_id = $cartId AND product_id=$productId", {
      $productId: productId,
      $cartId: cartId
    });
  return { db, cartId, productId, quantity ,existingItem };
}

export async function createCart(req,res) {
    const db = await getDatabase();
    let cartId = req.cookies.cart_id;
    console.log("created cart");
    if (!cartId) {
        cartId = crypto.randomUUID();
        res.cookie('cart_id', cartId, { httpOnly: true, secure: false });
        db.run('INSERT INTO cart (id) VALUES (?)', [cartId]);
    }
    else{
       console.log("cart exists" , cartId);
    }
    return cartId;
}
export async function syncCart(req) {
  const db = await getDatabase();
  const cartId =req.cookies.cart_id;
  const { items } = req.body;
  console.log(items);
  for(const item of items)
  {
   await db.run('INSERT INTO cart_items (cart_id,product_id, quantity) VALUES ($cartId, $productId,$quantity) ON CONFLICT(cart_id,product_id) DO UPDATE SET quantity= $quantity',
    {
      $cartId: cartId,
      $productId: item.id,
      $quantity: item.quantity,
    });
  }
  console.log({success: true});
  return { success: true };
}

export async function getCart(cartId) {
  const db = await getDatabase();
  let cartItems = await db.all("SELECT ci.product_id, ci.quantity, p.title,p.price, p.description, p.imageUrl FROM cart_items ci LEFT JOIN products p ON ci.product_id =p.id WHERE ci.cart_id=$cartId", {
        $cartId: cartId,
     })
    console.log("Fetched cart items:", cartItems);
    return cartItems;
}

export async function addToCart(req,res) {
      const {db , cartId, productId,quantity,existingItem} = await setupCartRequest(req,res);
      if(existingItem)
    {
      await db.run("UPDATE cart_items SET quantity = quantity + $quantity WHERE cart_id = $cartId AND product_id=$productId",{ $quantity: quantity, $cartId: cartId, $productId: productId });
    }
    else {
      await db.run(
        
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($cartId, $productId, $quantity)",
        { $cartId: cartId, $productId: productId, $quantity: quantity }
        
      );
    }

    return { cartId, productId, quantity };
}
export async function setQuantityFromCart(req,res) {
  try{
    const {db, cartId, productId, quantity,existingItem} = await setupCartRequest(req);
    if (!existingItem) {
      return res.status(400).json({ error: "Item doesn't exist" });
    }
      if(quantity> 0){
        await db.run("UPDATE cart_items SET quantity = $quantity WHERE cart_id = $cartId AND product_id=$productId",{ $quantity: quantity, $cartId: cartId, $productId: productId });
        return res.json({message: "quantity set to desired number"})
      }
      else
      {
        await db.run("DELETE FROM cart_items  WHERE cart_id = $cartId AND product_id=$productId",{  $cartId: cartId, $productId: productId });
        return res.json({message: "deleted item from cart successfully"})
      }


  }
  catch (err)
  {
    return res.status(400).json({error: err.message});
  }
}