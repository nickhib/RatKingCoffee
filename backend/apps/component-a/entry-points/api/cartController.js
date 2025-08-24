import { Router } from 'express';
import * as cartService from '../../domain/cartService.js'
const router = Router();
//To execute a query and retrieve all rows returned, we use db.all()
//method that will fetch a single row from a database: db.get()
router.get('/', async (req,res,next)  =>
{ 
try 
  {
     await cartService.checkCookie(req,res);//can check if the cart is in the database
     
     const cartId =req.cookies.cart_id;//grab from cookies
     let cart = await cartService.fetchCart(req,res);

     res.json({ cartId, items: cart });
  } 
  catch (err) 
  {
    next(err);
  }
});
router.post('/sync', async (req,res,next)  =>
{
  try{
  await cartService.checkCookie(req,res);
const result =  await cartService.syncitems(req);
    return res.json(result);
  }
  catch(err)
  {
    next(err);
  }

});
router.post('/add', async (req,res,next)  =>
{ 
try 
  {
    await cartService.checkCookie(req,res);
    const result = await cartService.addItemtoCart(req,res);
    return res.json({ message: "Product added", ...result });
  } 
  catch (err) 
  {
    next(err);
  }
});



export default router