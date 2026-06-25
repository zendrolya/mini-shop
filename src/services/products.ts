import type { ProductsResponse } from '../types/product';
import { getResource } from './api';

export function getProducts(limit = 20, skip = 0) {
  return getResource<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`);
}
