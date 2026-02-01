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
    Modal,
    TextField,
    MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import type { Expense } from '../interface/Expense';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Close } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

/* ------------------ Validation Schema ------------------ */
const createExpenseSchema = z.object({
    transactionName: z.string().min(3, 'Transaction name must be at least 3 characters'),
    amount: z.number().min(1, 'Amount must be at least 1'),
    isExpense: z.enum(['true', 'false']),
    category: z.string().min(3, 'Category must be at least 3 characters'),
});

type CreateExpenseFormData = z.infer<typeof createExpenseSchema>;

export const ExpensesPage = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [open, setOpen] = useState(false);

    const fetchExpenses = useCallback(async () => {
        try {
            const response = await axios.get("/api/v1/expenses");
            console.log("Data Fetched:", response.data);
            setExpenses(response.data);
        } catch (err) {
            console.error("No Data:", err);
        }
    }, []);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateExpenseFormData>({
        resolver: zodResolver(createExpenseSchema),
        defaultValues: {
            isExpense: 'true',
            transactionName: '',
            amount: 0,
            category: ''
        }
    });

    const onSubmit = async (data: CreateExpenseFormData) => {
        try {
            await axios.post('/api/v1/expenses', {
                ...data,
                isExpense: data.isExpense === 'true',
                createdAt: new Date().toISOString()
            });
            await fetchExpenses();
            handleClose();
        } catch (err) {
            console.error("Error adding expense:", err);
        }
    };

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
                            ₱ {expenses.reduce((sum, expense) => sum + expense.amount, 0)}
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
                                        {expense.transactionName}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {expense.createdAt}
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
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add new Expense
                        </Typography>
                        <Button onClick={handleClose}><Close /></Button>
                    </Box>

                    <TextField
                        label="Transaction Name"
                        fullWidth
                        margin="normal"
                        {...register('transactionName')}
                        error={!!errors.transactionName}
                        helperText={errors.transactionName?.message}
                    />

                    <TextField
                        type="number"
                        label="Amount"
                        fullWidth
                        margin="normal"
                        {...register('amount', { valueAsNumber: true })}
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                    <TextField
                        label="Category"
                        fullWidth
                        margin="normal"
                        {...register('category')}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                    />
                    <TextField
                        select
                        label="Type"
                        fullWidth
                        margin="normal"
                        defaultValue="true"
                        {...register('isExpense')}
                        error={!!errors.isExpense}
                        helperText={errors.isExpense?.message}
                    >
                        <MenuItem value="true">Expense</MenuItem>
                        <MenuItem value="false">Income</MenuItem>
                    </TextField>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{ mt: 3 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Adding...' : 'Add'}
                    </Button>
                </Box>
            </Modal>
        </>
    );
};
