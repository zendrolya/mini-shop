import {
  useReducer,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { Product } from '../types/product';
import { FavoritesContext } from './FavoritesCtx';

interface FavoritesState {
  items: Product[];
}

type FavoritesAction =
  | { type: 'TOGGLE_FAVORITE'; product: Product }
  | { type: 'ADD_FAVORITE'; product: Product }
  | { type: 'REMOVE_FAVORITE'; productId: number }
  | { type: 'CLEAR_FAVORITES' };

function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction
): FavoritesState {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const exists = state.items.some((i) => i.id === action.product.id);
      if (exists) {
        return {
          items: state.items.filter((i) => i.id !== action.product.id),
        };
      }
      return { items: [...state.items, action.product] };
    }
    case 'ADD_FAVORITE': {
      if (state.items.some((i) => i.id === action.product.id)) {
        return state;
      }
      return { items: [...state.items, action.product] };
    }
    case 'REMOVE_FAVORITE':
      return {
        items: state.items.filter((i) => i.id !== action.productId),
      };
    case 'CLEAR_FAVORITES':
      return { items: [] };
    default:
      return state;
  }
}

const STORAGE_KEY = 'favorites';

function loadInitialState(): FavoritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as FavoritesState;
      if (Array.isArray(parsed.items)) {
        return parsed;
      }
    }
  } catch {
    // игнорирование поврежденных данных
  }
  return { items: [] };
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    loadInitialState
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const totalCount = state.items.length;

  const isFavorite = useCallback(
    (productId: number) => state.items.some((i) => i.id === productId),
    [state.items]
  );

  const toggleFavorite = useCallback(
    (product: Product) => dispatch({ type: 'TOGGLE_FAVORITE', product }),
    []
  );

  const addFavorite = useCallback(
    (product: Product) => dispatch({ type: 'ADD_FAVORITE', product }),
    []
  );

  const removeFavorite = useCallback(
    (productId: number) => dispatch({ type: 'REMOVE_FAVORITE', productId }),
    []
  );

  const clearFavorites = useCallback(
    () => dispatch({ type: 'CLEAR_FAVORITES' }),
    []
  );

  const value = useMemo(
    () => ({
      items: state.items,
      totalCount,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
    }),
    [
      state.items,
      totalCount,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
