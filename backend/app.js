import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import { logRequests } from './libraries/logger/src/index.js';
import usersRouter from './apps/component-a/entry-points/api/productController.js';

const app = express();
app.use(express.json());
app.use(logRequests);

app.get('/', (req, res) => res.send('API is running'));
app.use('/api/products', usersRouter);

app.use(errorHandler);

export default app;