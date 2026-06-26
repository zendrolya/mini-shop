import { useEffect, useState } from 'react';
import type { Product } from '../types/product';
import { getProduct } from '../services/products';

interface UseProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: number) {
  const [state, setState] = useState<UseProductState>({
    product: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    getProduct(id)
      .then((data) => {
        if (!cancelled) {
          setState({ product: data, loading: false, error: null });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setState({
            product: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Неизвестная ошибка',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return state;
}
