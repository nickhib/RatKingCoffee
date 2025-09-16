import * as stripeService from '../../domain/stripeService.js'
import bodyParser from 'body-parser';
//https://docs.stripe.com/payments/quickstart?lang=node
app.use(bodyParser.json());
app.post("/create-payment-intent", async (req, res) => {
    try{
        const paymentIntent = stripeService.createPaymentIntent(req);
        res.send({
            clientSecret: paymentIntent.client_secret,
        })
    }
    catch (err)
    {
        res.status(500).send({error: err.message });
    }
});