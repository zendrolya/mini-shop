import { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesCtx';

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites должен использоваться в FavoritesProvider');
  }
  return ctx;
}
