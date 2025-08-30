import { getDatabase } from './getDatabase.js';

//reference https://expressjs.com/en/5x/api.html
// helper function

export async function createCart(req,res) {
    const db = await getDatabase();
    let cartId = req.cookies.cart_id;
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
export async function syncCart(req,cartId) {
  const db = await getDatabase();

  const { items } = req.body;
  console.log(cartId,"items",items);
  for(const item of items)
  {
   await db.run('INSERT INTO cart_items (cart_id,product_id, quantity) VALUES ($cartId, $productId,$quantity) ON CONFLICT(cart_id,product_id) DO UPDATE SET quantity= excluded.quantity',
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
  let cartItems = await db.all("SELECT ci.product_id AS id, ci.quantity, p.title,p.price, p.description, p.imageUrl FROM cart_items ci LEFT JOIN products p ON ci.product_id =p.id WHERE ci.cart_id=$cartId", {
        $cartId: cartId,
     })
     console.log("got cart",cartItems);
    console.log("fetched cart",{success: true});
    return cartItems;
}
