import * as Repo from '../data-access/orderRepository.js';
export async function createOrder(req,res,cartId,cashAmount){
        return await Repo.createOrder(req,res,cartId,cashAmount);
}
export async function editOrder(orderID, task){
    if(task === "confirmed")
    {
        return await Repo.editOrder(orderID, task);
    }
    console.error("payment was not confirmed, please try again.");
    return;
}


