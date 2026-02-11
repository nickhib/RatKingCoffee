import * as Repo from '../data-access/paymentRepository.js';
export async function createPayment(paymentIntent){
    return await Repo.createPayment(paymentIntent);
}
export async function editPayment(orderID, task){
    return await Repo.editPayment(orderID, task);
}
