import { useCallback } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../services/products';
import { useFetch } from './useFetch';

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): UseProductsState {
  const fetcher = useCallback(
    (signal: AbortSignal) => getProducts(20, 0, signal),
    []
  );
  const { data, loading, error } = useFetch(fetcher);

  return {
    products: data?.products ?? [],
    loading,
    error: error?.message ?? null,
  };
}
