import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Product, ProductsResponse } from '../types/product';
import {
  getProducts,
  searchProducts,
  getProductsByCategory,
} from '../services/products';

const PRODUCTS_LIMIT = 20;
const PRODUCTS_SKIP = 0;

interface UseProductsState {
  products: Product[];
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
  category: string = ''
): UseProductsState {
  const trimmedQuery = query.trim();
  const { data, isPending, error } = useQuery<ProductsResponse>({
    queryKey: ['products', { query: trimmedQuery, category }],
    queryFn: ({ signal }) => {
      if (category) {
        return getProductsByCategory(
          category,
          PRODUCTS_LIMIT,
          PRODUCTS_SKIP,
          signal
        );
      }
      if (trimmedQuery) {
        return searchProducts(
          trimmedQuery,
          PRODUCTS_LIMIT,
          PRODUCTS_SKIP,
          signal
        );
      }
      return getProducts(PRODUCTS_LIMIT, PRODUCTS_SKIP, signal);
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
    loading: isPending,
    error: error?.message ?? null,
  };
}
