import { useCallback } from 'react';
import type { Product } from '../types/product';
import { getProducts, searchProducts } from '../services/products';
import { useFetch } from './useFetch';
import { useDebounce } from './useDebounce';

const DEBOUNCE_DELAY_MS = 1000;
const PRODUCTS_LIMIT = 20;
const PRODUCTS_SKIP = 0;

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(query: string = ''): UseProductsState {
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY_MS);

  const fetcher = useCallback(
    (signal: AbortSignal) => {
      if (debouncedQuery.trim()) {
        return searchProducts(
          debouncedQuery.trim(),
          PRODUCTS_LIMIT,
          PRODUCTS_SKIP,
          signal
        );
      }
      return getProducts(PRODUCTS_LIMIT, PRODUCTS_SKIP, signal);
    },
    [debouncedQuery]
  );

  const { data, loading, error } = useFetch(fetcher);

  return {
    products: data?.products ?? [],
    loading,
    error: error?.message ?? null,
  };
}
