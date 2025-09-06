import { Router } from 'express';
import * as ProductService from '../../domain/productService.js'
const router = Router();
//with only 20 products returns an object of 6.5 kb.
// it is not worth to compress before return. 
router.get('/all-Products', async (req, res, next) => {
  try 
  {
    const products = await ProductService.getAllProducts();
    res.json({ products });
  } 
  catch (err) 
  {
    next(err);
  }
});
// /:id the colon to prefix capture dynamic segments of url so :id will be grabbed if i do params id 
router.get('/:id', async (req, res, next) => {
  try 
  {
    const product = await ProductService.getProductById(req.params.id);
    if (!product) 
      return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } 
  catch (err) 
  {
    next(err);
  }
});
router.get('/:id/reviews',async (req,res,next) => {
  try{
    const reviews = await ProductService.getReviewsById(req.params.id);
    return res.json({ reviews });
  }
  catch(err)
  {
    next(err);
  }
})
router.get('/:id/reviews/summary',async (req,res,next) => {
  try{
    const summary = await ProductService.getSummaryById(req.params.id);
    console.log(summary);
    return res.json({ summary });
  }
  catch(err)
  {
    next(err);
  }
})
export default router;