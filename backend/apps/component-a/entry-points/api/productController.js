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
router.post('/:id/reviews',async (req,res,next) => {
  try{
    console.log(req.body);
    let message = await ProductService.postReviewById(req.body,req.params.id);
    console.log(message);
     return res.json( {
      coffee_id: req.params.id,
      rating: req.body.rating,
      comment: req.body.comment,
      reviewer: req.body.reviewer,
      date: req.body.date
    })
  }
  catch(err)
  {
    next(err);
  }
})
router.get('/:id/reviews',async (req,res,next) => {
  try
  {
    const {sort} = req.query;
    const reviews = await ProductService.getReviewsById(req.params.id,sort);
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