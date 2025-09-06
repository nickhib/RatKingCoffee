import * as Repo from '../data-access/productRepository.js';

export async function getAllProducts() {
  return Repo.fetchAll();
}

export async function getProductById(id) {
  return Repo.fetchById(id);
}
export async function getReviewsById(id) {
  const rows = await Repo.fetchReviewsById(id);
  console.log(rows);
  return rows;
}

export async function getSummaryById(id) {
  const rows = await Repo.fetchSummaryById(id);
  return rows;
}