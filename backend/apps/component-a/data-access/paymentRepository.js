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
    let db = await getDatabase();
    if(!orderID)
    {
        console.error("editPayment: order id is undefined.");
        return;
    }
    let status;
    
    if (task === "confirmed") {
        status = "succeeded";
    } else if (task === "failed") {
        status = "failed";
    } else {
        console.error("editPayment: invalid task:", task);
        return;
    }
    const result = await db.run(`UPDATE payments SET status = ? WHERE order_id = ?`,[status, orderID]);
    if (result.changes === 0) {
        console.warn("could not find payment with order id", orderID);
        return false;
    }
    console.log(`Payment with ${ orderID } status marked as paid`);
    return true;
}

export async function fetchPaymentIntent(req, orderId){
    let db = await getDatabase();
    //db.get returns the row as an object
    const paymentIntentId = await db.get(`SELECT stripe_payment_intent FROM payment WHERE order_id = ? `,[orderId]);
    return paymentIntentId?.stripe_payment_intent;
}

