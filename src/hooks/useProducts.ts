import { useQuery } from '@tanstack/react-query';
import type { Product, ProductsResponse } from '../types/product';
import { getProducts, searchProducts } from '../services/products';

const PRODUCTS_LIMIT = 20;
const PRODUCTS_SKIP = 0;

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(query: string = ''): UseProductsState {
  const { data, isPending, error } = useQuery<ProductsResponse>({
    queryKey: ['products', query],
    queryFn: ({ signal }) => {
      if (query.trim()) {
        return searchProducts(
          query.trim(),
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
