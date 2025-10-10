import { Router } from 'express';
import * as cartService from '../../domain/cartService.js'
const router = Router();
//To execute a query and retrieve all rows returned, we use db.all()
//method that will fetch a single row from a database: db.get()
router.get('/', async (req,res,next)  =>
{ 
try 
  {
     const cartId = await cartService.checkCookie(req,res);//can check if the cart is in the database
     let cart = await cartService.fetchCart(cartId);
     for(let i of cart)
     {
      if (typeof i.imageUrl === 'string') {
        i.imageUrl = JSON.parse(i.imageUrl);
      }
     }
     console.log("cart = ",cart);

     return res.json({ items: cart });
  } 
  catch (err) 
  {
    next(err);
  }
});
router.post('/sync', async (req,res,next)  =>
{
  try{
  const cartId = await cartService.checkCookie(req,res);
  const result =  await cartService.syncitems(req,cartId);
    return res.json(result);
  }
  catch(err)
  {
    next(err);
  }

});



export default router