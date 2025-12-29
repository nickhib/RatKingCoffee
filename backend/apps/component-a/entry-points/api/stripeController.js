import * as stripeService from '../../domain/stripeService.js'
import { clearCart } from '../../data-access/cartRepository.js';
import { Router } from 'express';
const router = Router();
/* 
    If you are testing with the CLI, find the secret by running 'stripe listen'
    If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    at https://dashboard.stripe.com/webhooks
 */
const endpointSecret = 'mykey';
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
    router.post("/webhook", express.raw({type: 'application/json'}), (req, res) => {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    let event = req.body;
    if(!endpointSecret)
    {
        console.error("Missing webhook secret!");
        return res.sendStatus(500);
    }
    if(!signature)
    {
        console.warn("missing stripe signature in header")
        return res.sendStatus(400);
    }
    try 
    {
        event = stripeService.webhooks.constructEvent(req.body,signature, endpointSecret);
    }
    catch(e)
    {
        console.error("Stripe varification failed", e.message);
        return res.sendStatus(400)
    }

    const intent = event.data.object;
    switch (event.type){
        case "payment_intent.payment_failed":
            //access the stripe object
            //log that the payment has failed
            console.error("payment failed", intent.id);
            res.sendStatus(200);
            break;
        case "payment_intent.succeeded":
            const cart_id = intent.metadata.cart_id;
             clearCart(cart_id);//clears cart
             break;
    }
    /* 
    webhook should handle creating the order, clearing the cart and enqueuing the email that will be sent.
    */
});

export default router;