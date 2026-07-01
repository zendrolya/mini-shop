import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product, ProductsResponse } from '../types/product';
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from '../services/products';

const PRODUCTS_LIMIT = 20;

interface UseProductsState {
  products: Product[];
  total: number;
  loading: boolean;
  error: string | null;
}

function matchesQuery(product: Product, query: string): boolean {
  const q = query.toLowerCase();
  return (
    product.title.toLowerCase().includes(q) ||
    product.description.toLowerCase().includes(q) ||
    product.brand.toLowerCase().includes(q) ||
    product.category.toLowerCase().includes(q)
  );
}

export function useProducts(
  query: string = '',
  category: string = '',
  page: number = 1
): UseProductsState {
  const trimmedQuery = query.trim();
  const skip = (page - 1) * PRODUCTS_LIMIT;
  const { data, isPending, error } = useQuery<ProductsResponse>({
    queryKey: ['products', { query: trimmedQuery, category, page }],
    queryFn: ({ signal }) => {
      if (category) {
        return getProductsByCategory(category, PRODUCTS_LIMIT, skip, signal);
      }
      if (trimmedQuery) {
        return searchProducts(trimmedQuery, PRODUCTS_LIMIT, skip, signal);
      }
      return getProducts(PRODUCTS_LIMIT, skip, signal);
    },
  });

  const products = useMemo(() => {
    const list = data?.products ?? [];
    if (category && trimmedQuery) {
      return list.filter((p) => matchesQuery(p, trimmedQuery));
    }
    return list;
  }, [data, category, trimmedQuery]);

  return {
    products,
    total: data?.total ?? 0,
    loading: isPending,
    error: error?.message ?? null,
  };
}
