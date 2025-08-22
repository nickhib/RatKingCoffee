import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import { logRequests } from './libraries/logger/src/index.js';
import productRouter from './apps/component-a/entry-points/api/productController.js';
import cartRouter from './apps/component-a/entry-points/api/cartController.js';
import cookieHandler from './middlewares/cookieHandler.js';
import cookieParser from 'cookie-parser';
const app = express();
app.use(express.json());
app.use(logRequests);
app.use(cors()); // https://www.npmjs.com/package/cors
app.use(cookieParser());//https://www.npmjs.com/package/cookie-parser
app.use(cookieHandler);//middleware to create cookie if user does not have one.

app.get('/', (req, res) => res.send('API is running'));
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);

app.use(errorHandler);

export default app;