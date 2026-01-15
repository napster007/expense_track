import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Fab,
    Stack,
    Toolbar,
    Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';

/* -------- Temporary Mock Data -------- */
const expenses = [
    { id: 1, title: 'Groceries', amount: 1200, date: '2026-01-10' },
    { id: 2, title: 'Internet Bill', amount: 1500, date: '2026-01-05' },
];

export const ExpensesPage = () => {
    return (
        <>
            {/* Top App Bar */}
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Expense Tracker
                    </Typography>

                    <Button color="inherit" startIcon={<LogoutIcon />}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Page Content */}
            <Container sx={{ mt: 4, mb: 10 }}>
                {/* Monthly Summary */}
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                            Total Expenses (This Month)
                        </Typography>
                        <Typography variant="h4" color="error.main">
                            ₱ {expenses.reduce((sum, e) => sum + e.amount, 0)}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Expense List */}
                <Stack spacing={2}>
                    {expenses.map((expense) => (
                        <Card key={expense.id}>
                            <CardContent
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <Typography variant="subtitle1">
                                        {expense.title}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {expense.date}
                                    </Typography>
                                </Box>

                                <Typography variant="h6">
                                    ₱ {expense.amount}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>

                {/* Empty State */}
                {expenses.length === 0 && (
                    <Typography
                        textAlign="center"
                        color="text.secondary"
                        mt={4}
                    >
                        No expenses yet. Add one!
                    </Typography>
                )}
            </Container>

            {/* Floating Add Button */}
            <Fab
                color="primary"
                sx={{ position: 'fixed', bottom: 24, right: 24 }}
            >
                <AddIcon />
            </Fab>
        </>
    );
};
