import * as stripeService from '../../domain/stripeService.js'
import { clearCart } from '../../data-access/cartRepository.js';
import * as orderService from '../../domain/orderService.js'
import * as paymentService from '../../domain/paymentService.js'
import express, { Router } from 'express';

const router = Router();

router.post("/", express.raw({type: 'application/json'}), async (req, res) => {
    // verify stripe
    // determine the event payment successful/failed
    // edit order based on payment event
    // edit payment in database to event
    // clear cart
    console.log("webhook");
    let event;
    try{
        event = verifyStripe(req);//stripe verification
    }
    catch(e)
    {
        console.error("Verification Failed:",e.message);
        return res.status(400).send("invalid webhook");
    }
    res.status(200).send();
        /* 
        send status code 200 response early must be done. if stripe doesnt receive a timely response
        it may attempt to retry the webhook.

        helps with preventing retries, long running processes, idempotency concerns asynchronous processing.
        
        since we respond early we can now comprehensively log errors since stripe will no longer retry
        the webhook no matter what error you throw since we already sent it back 200. 
        
        */
    const intent = event.data.object;
    try 
    {
        const task = await stripeEvent(event);//payment verification
        const orderId = intent.metadata.order_id;
        const cartId = intent.metadata.cart_id;
        if(!orderId || !cartId){
            throw new Error("Missing orderId or cartId in metadata");
        }
        await orderService.editOrder(orderId,task)
        await paymentService.editPayment(orderId, task);
        if(task ==="confirmed")
            await clearCart(cartId,res);//clearing cart
    }
    catch(e)
    {
        console.error(`Stripe webhook failed (event type: ${event.type}):`, e.message);
        return res.sendStatus(400)
    }
    return res.sendStatus(200);

});

export default router;