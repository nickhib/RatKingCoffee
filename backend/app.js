import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import { logRequests } from './libraries/logger/src/index.js';
import productRouter from './apps/component-a/entry-points/api/productController.js';
import cartRouter from './apps/component-a/entry-points/api/cartController.js';
import stripeRouter  from  './apps/component-a/entry-points/api/stripeController.js';
import webhookRouter  from  './apps/component-a/entry-points/api/stripeWebhookController.js';
import cookieHandler from './middlewares/cookieHandler.js';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
const app = express();
app.use(logRequests);
app.use(cors({
    origin: ["http://localhost", "http://localhost:4200","http://127.0.0.1:4201","frontend-production-7a26.up.railway.app"],
    credentials: true
})); // https://www.npmjs.com/package/cors
app.use(cookieParser());//https://www.npmjs.com/package/cookie-parser
app.use(cookieHandler);//middleware to create cookie if user does not have one.
app.use('/api/webhook', webhookRouter);
app.use(express.json());
app.get('/', (req, res) => res.send('API is running'));
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/stripe', stripeRouter);

app.use(errorHandler);

export default app;