import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Box, Button, Link, Paper, Snackbar, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { registerValidator, type RegisterFormInputs } from '@/validators/userValidator';
import { useRegister } from '@/hooks/useRegister';
import { extractErrorMessage } from '@/utils/errorHandler';
import theme from '@/theme';
import logo from '@/assets/logo.jpg';

const RegisterForm = () => {
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
    reset,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phoneNumber: '',
      ssn: '',
      address: {
        city: '',
        street: '',
        number: '',
        postcode: '',
      },
    },
  });

  const registerMutation = useRegister();

  const onSubmit = (data: RegisterFormInputs) => {
    setSnackbar({ open: false, message: '', severity: 'success' });

    registerMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.status) {
          setSnackbar({
            open: true,
            message: `${res.message} ${res.data}. You can now login.`,
            severity: 'success',
          });
          reset();
        } else {
          setSnackbar({
            open: true,
            message: res.message,
            severity: 'error',
          });
        }
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: extractErrorMessage(error),
          severity: 'error',
        });
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          width: 800,
          mx: 'auto',
          mt: 5,
          pb: 5,
          bgcolor: theme.palette.background.default,
          borderRadius: 2,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* TOP PAPER BANNER with logo and welcome message */}
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
            bgcolor: 'primary.main',
            color: 'background.default',
            p: 3,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
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
          <Typography variant="h6" fontWeight="bold">
            Welcome to Citizen Portal
          </Typography>
        </Paper>

        {/* Online Registration Banner */}
        <Paper
          elevation={1}
          sx={{
            bgcolor: 'warning.main',
            mx: 6,
            mb: 2,
            p: 1,
            textAlign: 'center',
            boxShadow: 2,
          }}
        >
          <Typography variant="subtitle1" color={theme.palette.background.default}>
            Online Registration
          </Typography>
        </Paper>

        {/* Form */}
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: 700, mx: 'auto' }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Username */}
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username*"
                  placeholder="Enter your username"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email*"
                  placeholder="Enter your email"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* First Name */}
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="First Name*"
                  placeholder="Enter your first name"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.firstname}
                  helperText={errors.firstname?.message}
                />
              )}
            />

            {/* Last Name */}
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Last Name*"
                  placeholder="Enter your last name"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.lastname}
                  helperText={errors.lastname?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Address: City */}
            <Controller
              name="address.city"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City*"
                  placeholder="Enter your city"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.address?.city}
                  helperText={errors.address?.city?.message}
                />
              )}
            />

            {/* Address: Postcode */}
            <Controller
              name="address.postcode"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postcode*"
                  placeholder="Enter your postcode"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.address?.postcode}
                  helperText={errors.address?.postcode?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Address: Street */}
            <Controller
              name="address.street"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street*"
                  placeholder="Enter your street"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.address?.street}
                  helperText={errors.address?.street?.message}
                />
              )}
            />

            {/* Address: Number */}
            <Controller
              name="address.number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number*"
                  placeholder="Enter your street number"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.address?.number}
                  helperText={errors.address?.number?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Phone Number */}
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone Number*"
                  placeholder="Enter your phone number"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />
              )}
            />

            {/* SSN */}
            <Controller
              name="ssn"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="SSN*"
                  placeholder="Enter your ssn"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  error={!!errors.ssn}
                  helperText={errors.ssn?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password*"
                  placeholder="Enter your password"
                  InputLabelProps={{ shrink: true }}
                  type="password"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2, px: 4 }}>
            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? 'Registering...' : 'Register'}
            </Button>
          </Box>
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
          {snackbar.message}{' '}
          {snackbar.severity === 'success' && (
            <Link
              component={RouterLink}
              to="/login"
              style={{ color: 'inherit', textDecoration: 'underline', marginLeft: 8 }}
            >
              Login
            </Link>
          )}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterForm;
