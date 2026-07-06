import { useContext } from 'react';
import { CartContext } from '../context/CartCtx';

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart должен использоваться в CartProvider');
  }
  return ctx;
}
