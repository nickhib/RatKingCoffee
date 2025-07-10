import { Router } from 'express';
import * as ProductService from '../../domain/productService.js'
const router = Router();
router.get('/', async (req, res, next) => {
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
export default router;