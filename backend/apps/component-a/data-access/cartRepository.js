import { getDatabase } from './getDatabase.js';


export async function createCart(req,res) {
    const db = await getDatabase();
    if (!req.cookies.cart_id) {
        const cartId = crypto.randomUUID();
        res.cookie('cart_id', cartId, { httpOnly: true, secure: false });
        db.run('INSERT INTO cart (cart_id) VALUES (?)', [cartId]);
    }
}

export async function getCart(req,res) {
     const db = await getDatabase();
const cartId =req.cookies.cart_id;
let cart = await db.all("SELECT ci.product_id, ci.quantity, p.title,p.price, p.description, p.imageUrl FROM cart_items ci JOIN products p ON ci.product_id =p.id WHERE ci.cart_id=$cartId", {
        $cartId: cartId,
     })
     console.log("Fetched cart items:", cart);
    return cart;
}

export async function addToCart(req,res) {

const db = await getDatabase();
    const cartId =req.cookies.cart_id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
        return res.status(400).json({ error: "productId and quantity are required to add item to cart" });
    }
    const existingItem = await db.get("SELECT * FROM cart_items WHERE cart_id = $cartId AND product_id=$productId", {
      $productId: productId,
      $cartId: cartId
    });//selects all items in cart_items table that has cart_id = ? and product_id = ?
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
}