import { getDatabase } from './getDatabase.js';
import crypto from 'crypto';
export async function createOrder(req,cartId,cashAmount) {
    let db = getDatabase();
    const {allItems} = req.body;
    let address = allItems.addressData;
    let email = allItems.emailData;
    let orderId = `ord_${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    await db.run(`
        INSERT INTO orders (
            id, cart_id, total_amount, status, name,
            email, phone, address, city, state, zipcode
        ) VALUES (?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?)
        ` , [
            orderId, 
            cartId, 
            cashAmount ,
             'pending', 
             `${address.firstNameCtrl} ${address.lastNameCtrl}`,
            email.EmailCtrl , 
            address.phoneNumber, 
            address.Addressline1Ctrl, 
            address.cityCtrl, 
            address.StateCtrl, 
            address.zipCodeCtrl
        ]
    )

    return orderId;
}