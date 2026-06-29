import { useQuery } from '@tanstack/react-query';
import type { Product, ProductsResponse } from '../types/product';
import { getProducts, searchProducts } from '../services/products';
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

  const { data, isPending, error } = useQuery<ProductsResponse>({
    queryKey: ['products', debouncedQuery],
    queryFn: ({ signal }) => {
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
  });

  return {
    products: data?.products ?? [],
    loading: isPending,
    error: error?.message ?? null,
  };
}
