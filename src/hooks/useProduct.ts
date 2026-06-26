import { useCallback } from 'react';
import type { Product } from '../types/product';
import { getProduct } from '../services/products';
import { useFetch } from './useFetch';

interface UseProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  rawError: Error | null;
}

export function useProduct(id: number): UseProductState {
  const fetcher = useCallback(
    (signal: AbortSignal) => getProduct(id, signal),
    [id]
  );
  const { data, loading, error } = useFetch(fetcher);

  return {
    product: data,
    loading,
    error: error?.message ?? null,
    rawError: error,
  };
}
