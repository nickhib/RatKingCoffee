import express from 'express';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import { logRequests } from './libraries/logger/src/index.js';
import productRouter from './apps/component-a/entry-points/api/productController.js';

const app = express();
app.use(express.json());
app.use(logRequests);
app.use(cors()); // 


app.get('/', (req, res) => res.send('API is running'));
app.use('/api/products', productRouter);

app.use(errorHandler);

export default app;