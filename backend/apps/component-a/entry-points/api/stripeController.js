import * as stripeService from '../../domain/stripeService.js'
import { clearCart } from '../../data-access/cartRepository.js';
import * as orderService from '../../domain/orderService.js'
import express, { Router } from 'express';

const router = Router();
/* 
    If you are testing with the CLI, find the secret by running 'stripe listen'
    If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    at https://dashboard.stripe.com/webhooks
 */
//https://docs.stripe.com/payments/quickstart?lang=node
router.post("/create-payment-intent", async (req, res) => {
    try{
        const paymentIntent = await stripeService.createPaymentIntent(req);
        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    }
    catch (err)
    {
        res.status(500).send({error: err.message });
    }
});
/* 

    If you are testing with the CLI, find the secret by running 'stripe listen'
    If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    at https://dashboard.stripe.com/webhooks
 */
    router.post("/webhook", express.raw({type: 'application/json'}), async (req, res) => {
    // Get the signature sent by Stripe
    let event;
    let cartId
    try 
    {
        event = verifyStripe(req);//stripe verification
        cartId = await stripeEvent(event);//payment verification
        const orderId = intent.metadata.order_id;
        if(!cartId){
            throw new Error(`payment intent metadata did not contain cart id`);
        }
        orderService.editOrder(orderId,"confirmed")


        await clearCart(cartId);//clearing cart


    }
    catch(e)
    {
        console.error("Stripe webhook failed", e.message);
        return res.sendStatus(400)
    }
    return res.sendStatus(200);
    /* 
    webhook should handle creating the order, clearing the cart and enqueuing the email that will be sent.
    */
});

export default router;