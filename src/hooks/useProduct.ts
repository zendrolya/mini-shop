import { useQuery } from '@tanstack/react-query';
import type { Product } from '../types/product';
import { getProduct } from '../services/products';

interface UseProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  rawError: Error | null;
}

export function useProduct(id: number): UseProductState {
  const { data, isPending, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: ({ signal }) => getProduct(id, signal),
  });

  return {
    product: data ?? null,
    loading: isPending,
    error: error?.message ?? null,
    rawError: error,
  };
}
