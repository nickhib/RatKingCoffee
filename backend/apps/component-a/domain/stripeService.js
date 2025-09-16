import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

const calculateOrderAmount = (items) => {
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

export async function createPaymentIntent(req)
{
    const { items } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
    return paymentIntent;
}