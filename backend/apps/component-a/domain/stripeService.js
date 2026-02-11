import Stripe from "stripe";
import dotenv from 'dotenv';
import { createOrder } from "./orderService.js";
import { createPayment } from "./paymentService.js";
dotenv.config();
const endpointSecret = 'mykey';
//process.env.STRIPE_webhook_secret
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
  const cartId = req.cookies?.cart_id;
  if (!cartId) {
    return {
      //returns this object if we cannot find the cookie. 
      ok: false,
      error: "missing cart cookie" 
    }
  }
    const cashAmount =calculateOrderAmount(allItems);
   
    const orderId = await createOrder(req, cartId,cashAmount);
     console.log("yes");
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const paymentIntent = await stripe.paymentIntents.create({
    amount: cashAmount,
    currency: "usd",
    metadata: {
      cart_id: cartId,
      order_id: orderId
    },
    automatic_payment_methods: {
      enabled: true,
    },
  });
  await createPayment(paymentIntent);
  return paymentIntent;
}

export function verifyStripe(req)
{
  const signature = req.headers['stripe-signature'];
  let event = req.body;
  if(!endpointSecret)
  {
    console.error("Missing webhook secret!");
    throw new Error("Missing webhook secret");
  }
  if(!signature)
  {
    console.warn("missing stripe signature in header");
    throw new Error("Missing Stripe signature");
  }
  return stripeService.webhooks.constructEvent(event,signature, endpointSecret);
}

export async function stripeEvent(event)
{

      const intent = event.data.object;
      switch (event.type){
          case "payment_intent.payment_failed":
              console.error("payment failed", intent.id);
              throw new Error("payment failed");
          case "payment_intent.succeeded":
              const cartId = intent.metadata.cart_id;
              if(!cartId)
              {
                throw new Error("missing cart_id in payment intent metadata");
              }
              return cartId; 
          default:
            throw new Error(`unhandled stripe event: ${event}`);
      }
}
