import type { Product, ProductsResponse } from '../types/product';
import { getResource } from './api';

export function getProducts(limit: number = 20, skip: number = 0) {
  return getResource<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
}

export function getProduct(id: number) {
  return getResource<Product>(`/products/${id}`);
}
