import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import logo from '@/assets/logo.jpg';
import { loginValidator, type LoginFormInputs } from '@/validators/userValidator';
import { useLogin } from '@/hooks/useLogin';
import { extractErrorMessage } from '@/utils/errorHandler';

const LoginForm = () => {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      usernameOrEmail: '',
      password: '',
    },
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.status) {
          reset();
          navigate('/users/me', { replace: true });
        } else {
          setSnackbar({ open: true, message: res.message, severity: 'error' });
        }
      },
      onError: (error) => {
        setSnackbar({ open: true, message: extractErrorMessage(error), severity: 'error' });
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          width: 550,
          mx: 'auto',
          mt: 10,
          bgcolor: 'background.default',
          borderRadius: 2,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Paper
          elevation={1}
          sx={{
            bgcolor: 'primary.main',
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            borderRadius: '8px 8px 0 0',
            boxShadow: 4,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
              width: 80,
              height: 'auto',
              objectFit: 'contain',
            }}
          />

          {/* Header text */}
          <Typography variant="h6" fontWeight="bold" color="background.default">
            Welcome to Citizen Portal
          </Typography>
        </Paper>

        {/* Content section (with padding) */}
        <Box sx={{ p: 3, px: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            textAlign="center"
            color="primary"
            sx={{ mb: 2 }}
          >
            Sign in to your account
          </Typography>

          {/* Username or Email Field */}
          <Controller
            name="usernameOrEmail"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Username or Email*"
                placeholder="Enter your username or email"
                fullWidth
                error={!!errors.usernameOrEmail}
                helperText={errors.usernameOrEmail?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          {/* Password Field */}
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Password*"
                placeholder="Enter your password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="contained" color="primary" size="large">
              {loginMutation.isPending ? 'Logging in...' : 'Login'}
            </Button>
          </Box>

          <Typography variant="body2" textAlign="center">
            Don&apos;t have an account?{' '}
            <Link href="/register" underline="hover" color="primary">
              Register
            </Link>
          </Typography>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginForm;
