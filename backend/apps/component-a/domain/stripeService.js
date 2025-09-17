import Stripe from "stripe";
import dotenv from 'dotenv';

dotenv.config();

const calculateOrderAmount = (items) => {
  console.log(items);
  let total = 0;
  items.products.forEach((item) => {
    total += (Math.round(item.price * 100)* item.quantity);
  });
  let shipping = 0;
  if(items.shippingMethod == 'express')
  {
    shipping = 3294;
  }
  else if (items.shippingMethod == 'standard')
  {
    shipping = 1499;

  }
  total+= shipping;
  return total;
};

export async function createPaymentIntent(req)
{
    const { allItems } = req.body;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(allItems),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  
    return paymentIntent;
}