import * as stripeService from '../../domain/stripeService.js'

import * as paymentService from '../../domain/paymentService.js'
import { orderStatusLookup } from "../../data-access/orderRepository.js";
import { Router } from 'express';

const router = Router();
/* 
    If you are testing with the CLI, find the secret by running 'stripe listen'
    If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    at https://dashboard.stripe.com/webhooks
 */
//https://docs.stripe.com/payments/quickstart?lang=node
router.post("/create-payment-intent", async (req, res) => {
    //perhaps run cron job to check if orders are expired?
    res.clearCookie('order_id');
    let orderId = req.cookies.order_id;
    if(orderId){
        if(orderStatusLookup(orderId).status !='paid')
        {
            const paymentIntent =await paymentService.useExistingPaymentIntent(req, orderId);
            if(paymentIntent)
            return res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                orderId: paymentIntent.metadata.order_id
            })
        }
    }
    try{
        const paymentIntent = await stripeService.createPaymentIntent(req);
            res.cookie('order_id', paymentIntent.metadata.order_id, { httpOnly: true, secure: false });
            console.log("sadas")
            return res.status(200).json({
                clientSecret: paymentIntent.client_secret,
                orderId: paymentIntent.metadata.order_id
            })
        }
        catch (err)
        {
           return res.status(500).send({error: err.message });
        }
});
/* 

    If you are testing with the CLI, find the secret by running 'stripe listen'
    If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    at https://dashboard.stripe.com/webhooks
 */

export default router;