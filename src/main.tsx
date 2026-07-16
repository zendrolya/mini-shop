import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ColorModeProvider } from './context/ColorModeContext';
import ThemedApp from './components/ThemedApp';
import './index.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ColorModeProvider>
          <ThemedApp />
        </ColorModeProvider>
      </HashRouter>
    </QueryClientProvider>
  </StrictMode>
);
