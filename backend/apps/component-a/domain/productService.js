import * as Repo from '../data-access/productRepository.js';

export async function getAllProducts() {
  return Repo.fetchAll();
}

export async function getProductById(id) {
  return Repo.fetchById(id);
}
export async function getAllReviews() {
  const rows = await Repo.fetchReviews();
  console.log(rows);
  return rows;
}