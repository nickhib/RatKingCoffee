import * as Repo from '../data-access/cartRepository.js';

export async function checkCookie(req,res){
   return await Repo.createCart(req,res);
}

export async function fetchCart(cartId){
   return await Repo.getCart(cartId);
}
export async function syncitems(req,cartId){
   return await Repo.syncCart(req,cartId);
}