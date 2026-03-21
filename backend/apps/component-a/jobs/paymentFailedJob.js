import { clearCart } from '../data-access/cartRepository.js';
import * as orderService from '../domain/orderService.js';
import * as paymentService from '../domain/paymentService.js';

export async function processPaymentFailed(job) {
   console.log(`Processing failed payment: ${job.data.eventId}`);
    const paymentIntent = job.data.paymentIntent;
        try{
            const orderId = paymentIntent?.metadata?.order_id;
            const cartId = paymentIntent?.metadata?.cart_id;
            if(!orderId || !cartId){
                throw new Error("Missing orderId or cartId in metadata");
            }
            await orderService.editOrder(orderId,"failed");
            await paymentService.editPayment(orderId, "failed");
            await clearCart(cartId);//clearing cart
        }
        catch(e)
        {
            console.error(`process payment successful failed: `, e.message);
        }
        return;

}