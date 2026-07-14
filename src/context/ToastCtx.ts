import { createContext } from 'react';

type Severity = 'success' | 'info' | 'warning' | 'error';

export interface ToastContextValue {
  showToast: (message: string, severity?: Severity) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
