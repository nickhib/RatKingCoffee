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


export async function editOrder(orderID, task) {
    let db = await getDatabase(); 

    //need to make sure order items are recorded right now orders is the only thing changed and payments need to be logged
    //this is to make sure that we can view how users paid what they paid for and delivery address.,
    let status;
    try{
        if(task == "confirmed")
        {
            status = "complete";
            await db.run(`
            UPDATE orders SET status = 'paid' WHERE id = ?`,[orderID]);
        }
    }
    catch(e)
    {
        throw new Error(`orders table update failed task = ${task} - error:${ e } `);
    }
}