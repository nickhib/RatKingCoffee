import * as stripeService from '../../domain/stripeService.js'
import { clearCart } from '../../data-access/cartRepository.js';
import * as orderService from '../../domain/orderService.js'
import * as paymentService from '../../domain/paymentService.js'
import express, { Router } from 'express';

const router = Router();
/* 
    If you are testing with the CLI, find the secret by running 'stripe listen'
    If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    at https://dashboard.stripe.com/webhooks
 */
//https://docs.stripe.com/payments/quickstart?lang=node
router.post("/create-payment-intent", async (req, res) => {
    /*
    if order does not exist then we must create one
    else it does exist
    if does exist we must just edit the payment intent 
    */
    let orderId = req.cookies.order_id;
    if(!orderId){
        try{
            const paymentIntent = await stripeService.createPaymentIntent(req);
            res.cookie('order_id', paymentIntent.metadata.order_id, { httpOnly: true, secure: false });
            return res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                orderId: paymentIntent.metadata.order_id
            })
        }
        catch (err)
        {
           return res.status(500).send({error: err.message });
        }
    }
 
    const paymentIntent = paymentService.useExistingPaymentIntent(req);
    return res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        orderId: paymentIntent.metadata.order_id
    })
});
/* 

    If you are testing with the CLI, find the secret by running 'stripe listen'
    If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    at https://dashboard.stripe.com/webhooks
 */
router.post("/webhook", express.raw({type: 'application/json'}), async (req, res) => {
    // verify stripe
    // determine the event payment successful/failed
    // edit order based on payment event
    // edit payment in database to event
    // clear cart
        let event;
        try{
            event = verifyStripe(req);//stripe verification
        }
        catch(e)
        {
            console.error("Verification Failed:",e.message);
            return res.status(400).send("invalid webhook");
        }
        const intent = event.data.object;
        try 
        {
            const task = await stripeEvent(event);//payment verification
            const orderId = intent.metadata.order_id;
            if(!orderId){
                throw new Error("Missing orderId or cartId in metadata");
            }
           await orderService.editOrder(orderId,task)
           await paymentService.editPayment(orderId, task);
            if(task ==="confirmed")
                await clearCart(cartId);//clearing cart
        }
        catch(e)
        {
            console.error("Stripe webhook failed", e.message);
            return res.sendStatus(400)
        }
        return res.sendStatus(200);

});

export default router;