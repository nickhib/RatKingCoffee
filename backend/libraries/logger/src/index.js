import dotenv from 'dotenv';
dotenv.config();

export function logRequests(req, res, next) {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}