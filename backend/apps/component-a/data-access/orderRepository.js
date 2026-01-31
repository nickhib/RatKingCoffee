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
    return orderId;
}