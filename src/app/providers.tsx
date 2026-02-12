// src/app/providers.tsx
import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../theme';

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>{children}</BrowserRouter>
        </ThemeProvider>
    </QueryClientProvider>
);
