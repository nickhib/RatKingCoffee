import * as stripeService from '../../domain/stripeService.js'
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

router.post("/webhook", async (req, res) => {

    /* 
    webhook should handle creating the order, clearing the cart and enqueuing the email that will be sent. 
    
    
    */

    


});

export default router;