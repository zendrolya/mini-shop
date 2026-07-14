import { createContext } from 'react';
import type { Product } from '../types/product';

export interface FavoritesContextValue {
  items: Product[];
  totalCount: number;
  isFavorite: (productId: number) => boolean;
  toggleFavorite: (product: Product) => void;
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  clearFavorites: () => void;
}

export const FavoritesContext = createContext<FavoritesContextValue | null>(
  null
);
