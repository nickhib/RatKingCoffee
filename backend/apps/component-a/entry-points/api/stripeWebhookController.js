import * as stripeService from '../../domain/stripeService.js'
import express, { Router } from 'express';
import { processPaymentSuccess } from'../../jobs/paymentSuccessJob.js';
import { processPaymentFailed } from'../../jobs/paymentFailedJob.js';
import Queue from "bull";
const router = Router();
const paymentSuccessQueue = new Queue('payment-success-processing', process.env.REDIS_URL);
const paymentFailedQueue = new Queue('payment-failed-processing', process.env.REDIS_URL);
paymentSuccessQueue.process(5, processPaymentSuccess);
paymentFailedQueue.process(3, processPaymentFailed);

router.post("/", express.raw({type: 'application/json'}), async (req, res) => {
    // verify stripe
    // determine the event payment successful/failed
    // edit order based on payment event
    // edit payment in database to event
    // clear cart
    // add queue 
    // prevent duplicate events
    console.log("webhook");
    let event;
    try{
        event = stripeService.verifyStripe(req);//stripe verification
        const intent = event.data.object;
        switch (event.type){
            case "payment_intent.payment_failed":
                console.log("payment failed", intent.id);
                await paymentFailedQueue.add(
                {
                    eventId: event.id,
                    paymentIntent: event.data.object
                },
                {
                    jobId: event.id,
                    removeOnComplete: true,
                    attempts: 3
                });
                break;
            case "payment_intent.succeeded":
                console.log("payment succeeded", intent.id);
                await paymentSuccessQueue.add(
                {
                    eventId: event.id,
                    paymentIntent: event.data.object
                },
                {
                    jobId: event.id,
                    removeOnComplete: true,
                    attempts: 3
                });
                break; 
            default:
                break;
      }
    }
    catch(e)
    {
        console.error("Verification Failed:",e.message);
    }
    return res.status(200).send();
        /* 
        send status code 200 response early must be done. if stripe doesnt receive a timely response
        it may attempt to retry the webhook.

        helps with preventing retries, long running processes, idempotency concerns asynchronous processing.
        
        since we respond early we can now comprehensively log errors since stripe will no longer retry
        the webhook no matter what error you throw since we already sent it back 200. 
        
        */

});

export default router;