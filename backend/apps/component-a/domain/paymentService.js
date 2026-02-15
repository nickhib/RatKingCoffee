import * as Repo from '../data-access/paymentRepository.js';
import { editPaymentIntent, stripeEvent } from './stripeService.js';
import Stripe from "stripe";
export async function createPayment(paymentIntent){
    return await Repo.createPayment(paymentIntent);
}
export async function editPayment(orderID, task){
    return await Repo.editPayment(orderID, task);
}
export async function useExistingPaymentIntent(req){
    /*
        use order id cookie
        look up payment intent using order id on the payments table where the intent lies


    */
    let paymentIntentId = await Repo.fetchPaymentIntent(req, orderId);
    return editPaymentIntent(req,paymentIntentId);
}