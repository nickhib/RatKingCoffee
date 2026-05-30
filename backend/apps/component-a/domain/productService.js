import * as Repo from '../data-access/productRepository.js';

export async function getAllProducts() {
  return Repo.fetchAll();
}

export async function getProductById(id) {
  return Repo.fetchById(id);
}
export async function getReviewsById(id,sort) {
  if(sort === "reviewer")
    return await Repo.fetchReviewsByReviewer(id);
  if(sort === "rating")
    return await Repo.fetchReviewsByRating(id);
  if(sort === "date")
    return await Repo.fetchReviewsByDate(id);
  return [];
}

export async function getSummaryById(id) {
  const rows = await Repo.fetchSummaryById(id);
  return rows;
}
export async function postReviewById(item,id){
  return await Repo.postReview(item,id);
}