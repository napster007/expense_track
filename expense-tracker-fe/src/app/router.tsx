// src/app/router.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../features/auth/pages/LoginPage';
import { ExpensesPage } from '../features/expenses/pages/ExpensesPage';

export const AppRouter = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<LoginPage />} />

            {/* Protected (temporary) */}
            <Route path="/expenses" element={<ExpensesPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};
