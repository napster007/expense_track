// src/app/App.tsx
import { AppProviders } from './providers';
import { AppRouter } from './router';

export const App = () => (
  <AppProviders>
    <AppRouter />
  </AppProviders>
);
