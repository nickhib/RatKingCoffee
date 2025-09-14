import * as Repo from '../data-access/productRepository.js';

export async function getAllProducts() {
  return Repo.fetchAll();
}

export async function getProductById(id) {
  return Repo.fetchById(id);
}
export async function getReviewsById(id,sort) {
  
  const rows = await Repo.fetchReviewsByReviewer(id,sort);

  return rows;
}

export async function getSummaryById(id) {
  const rows = await Repo.fetchSummaryById(id);
  return rows;
}
export async function postReviewById(item,id){
  return await Repo.postReview(item,id);
}