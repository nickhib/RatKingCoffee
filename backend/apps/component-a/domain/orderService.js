import * as Repo from '../data-access/orderRepository.js';
export async function createOrder(req,cartId,cashAmount){
    return await Repo.createOrder(req,cartId,cashAmount);
}

