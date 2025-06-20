import * as Repo from '../data-access/productRepository.js';

export async function getAllProducts() {
  return Repo.fetchAll();
}

export async function getProductById(id) {
  return Repo.fetchById(id);
}