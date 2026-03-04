import { clearCart } from '../data-access/cartRepository.js';
import * as orderService from '../domain/orderService.js';
import * as paymentService from '../domain/paymentService.js';
export async function processPaymentSuccess(job) {
    console.log(`Processing successful payment: ${job.data.eventId}`);
    const paymentIntent = job.data.paymentIntent;
        try{
            const orderId = paymentIntent?.metadata?.order_id;
            const cartId = paymentIntent?.metadata?.cart_id;
            if(!orderId || !cartId){
                throw new Error("Missing orderId or cartId in metadata");
            }
            await orderService.editOrder(orderId,"confirmed")
            await paymentService.editPayment(orderId, "confirmed");
            await clearCart(cartId);//clearing cart
        }
        catch(e)
        {
            console.error(`process payment successful failed: `, e.message);
        }
        return;
}