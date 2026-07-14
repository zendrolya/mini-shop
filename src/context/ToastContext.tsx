import { useState, useCallback, type ReactNode } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { ToastContext, type ToastContextValue } from './ToastCtx';

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<
    'success' | 'info' | 'warning' | 'error'
  >('success');
  const [key, setKey] = useState(0);

  const showToast = useCallback(
    (msg: string, sev: 'success' | 'info' | 'warning' | 'error' = 'success') => {
      setMessage(msg);
      setSeverity(sev);
      setKey((k) => k + 1);
      setOpen(true);
    },
    []
  );

  const value: ToastContextValue = { showToast };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Snackbar
        key={key}
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
