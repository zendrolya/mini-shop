import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProducts } from '../services/products';

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts() {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getProducts()
      .then((data) => {
        if (!cancelled) {
          setState({ products: data.products, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            products: [],
            loading: false,
            error: err instanceof Error ? err.message : 'Неизвестная ошибка',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
