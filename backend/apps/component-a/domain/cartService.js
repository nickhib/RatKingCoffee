import * as Repo from '../data-access/cartRepository.js';

export async function checkCookie(req,res){
    Repo.createCart(req,res);
}

export async function fetchCart(req,res){
   return await Repo.getCart(req,res);
}
export async function addItemtoCart(req,res){
  return await Repo.addToCart(req,res);
}
export async function syncitems(req){
   return await Repo.syncCart(req);
}