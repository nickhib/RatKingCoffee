import { getDatabase } from './getDatabase.js';
import crypto from 'crypto';
export async function createOrder(req,cartId,cashAmount) {
    let db = await getDatabase();
    const {allItems} = req.body;
    let address = allItems.addressData;
    let email = allItems.EmailData?.EmailCtrl ? allItems.EmailData.EmailCtrl : " " ;
    let orderId = `ord_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    console.log(
            orderId, 
            cartId, 
            cashAmount ,
             `${address.firstNameCtrl} ${address.lastNameCtrl}`,
            email , 
            address.phoneNumber, 
            address.Addressline1Ctrl, 
            address.cityCtrl, 
            address.StateCtrl, 
            address.zipCodeCtrl
    );
    await db.run(`
        INSERT INTO orders (
            id, cart_id, total_amount, status, name,
            email, phone, address, city, state, zipcode
        ) VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)
        ` , [
            orderId, 
            cartId, 
            cashAmount ,
             `${address.firstNameCtrl} ${address.lastNameCtrl}`,
            email , 
            address.phoneNumber, 
            address.Addressline1Ctrl, 
            address.cityCtrl, 
            address.StateCtrl, 
            address.zipCodeCtrl
        ]
    )
    const cart_items = await db.all(`SELECT ci.product_id, ci.quantity, p.price FROM cart_items ci 
        JOIN products p ON ci.product_id = p.id WHERE ci.cart_id = ?`, [cartId]);
    for (const item of cart_items) {
        console.log(orderId, item.product_id, item.quantity, item.price);
        await db.run(`
        INSERT INTO order_items
        (order_id, product_id, quantity, price_at_purchase)
        VALUES (?, ?, ?, ?)
    `, [orderId, item.product_id, item.quantity, item.price]);
    }
    return orderId;
}


export async function editOrder(orderID, task) {
    let db = await getDatabase(); 
    let status;
    if(task == "confirmed")
    {
        status = "complete";
        await db.run(`UPDATE orders SET status = 'paid' WHERE id = ?`,[orderID]);
    }
}