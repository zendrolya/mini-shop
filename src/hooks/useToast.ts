import { useContext } from 'react';
import { ToastContext } from '../context/ToastCtx';

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast должен использоваться в ToastProvider');
  }
  return ctx;
}
