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

export async function fetchPaymentIntent(req, orderId){
    let db = await getDatabase();
    //db.get returns the row as an object
    const paymentIntentId = await db.get(`SELECT stripe_payment_intent FROM payment WHERE order_id = ? `,[orderId]);
    return paymentIntentId?.stripe_payment_intent;
}

