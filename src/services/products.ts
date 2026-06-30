import type { Product, ProductsResponse } from '../types/product';
import { getResource } from './api';

export function getProducts(
  limit: number = 20,
  skip: number = 0,
  signal?: AbortSignal
) {
  return getResource<ProductsResponse>(
    `/products?limit=${limit}&skip=${skip}`,
    signal
  );
}

export function searchProducts(
  query: string,
  limit: number = 20,
  skip: number = 0,
  signal?: AbortSignal
) {
  return getResource<ProductsResponse>(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    signal
  );
}

export function getProduct(id: number, signal?: AbortSignal) {
  return getResource<Product>(`/products/${id}`, signal);
}

export function getCategories(signal?: AbortSignal) {
  return getResource<string[]>('/products/category-list', signal);
}

export function getProductsByCategory(
  category: string,
  limit: number = 20,
  skip: number = 0,
  signal?: AbortSignal
) {
  return getResource<ProductsResponse>(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`,
    signal
  );
}
