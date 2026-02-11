import { getDatabase } from './getDatabase.js';
import crypto from 'crypto';

export async function createPayment(paymentIntent) {
    //get database
    //insert payment into payments
    // return 
    let db = await getDatabase();

    const orderId = paymentIntent.metadata.order_id;
    const paymentId = paymentIntent.id;
    const amount = paymentIntent.amount;
    const currency = paymentIntent.currency;
    await db.run(`INSERT INTO payments 
    (order_id, stripe_payment_intent, status, amount, currency)
    VALUES (?, ?, 'created', ?, ?);`,[orderId,paymentId,amount, currency]);
    return;
}
export async function editPayment(orderID, task) {


}