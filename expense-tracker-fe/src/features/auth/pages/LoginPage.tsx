import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    TextField,
    Typography,
    InputAdornment,
    Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/* ------------------ Validation Schema ------------------ */
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/* ------------------ Component ------------------ */
export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        setError(null);

        try {
            console.log('Login payload:', data);
            // 🔜 API call will go here
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Card sx={{ width: '100%', boxShadow: 4 }}>
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="h4" textAlign="center" gutterBottom>
                        Expense Tracker
                    </Typography>

                    <Typography
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                        mb={3}
                    >
                        Sign in to continue
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                    >
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            {...register('email')}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            fullWidth
                            margin="normal"
                            {...register('password')}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3 }}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Signing in...' : 'Login'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};
