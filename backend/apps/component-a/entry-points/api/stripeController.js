import * as stripeService from '../../domain/stripeService.js'
import { clearCart } from '../../data-access/cartRepository.js';
import { Router } from 'express';
const router = Router();
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

router.post("/webhook", bodyParser.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const secret = "";
    const event = stripeService.webhooks.constructEvent(req.body,sig, secret);
    if(event.type ==="payment_intent.payment_failed")
    {
        console.log("payment failed");
        return res.status(200).send('Failure handled');
    }
    const paymentIntent = event.data.object;
    const cart_id = paymentIntent.metadata.cart_id;
    clearCart(cart_id);


    /* 
    webhook should handle creating the order, clearing the cart and enqueuing the email that will be sent.
    
    */

    


});

export default router;