import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../services/products';

interface UseCategoryProductsState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

export function useCategoryProducts(): UseCategoryProductsState {
  const { data, isPending, error } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: ({ signal }) => getCategories(signal),
    staleTime: 5 * 60 * 1000,
  });

  return {
    categories: data ?? [],
    loading: isPending,
    error: error?.message ?? null,
  };
}
