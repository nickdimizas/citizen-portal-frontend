import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { registerValidator, type RegisterFormInputs } from '@/validators/authValidator';
import { useRegister } from '@/hooks/useRegister';
import { extractErrorMessage } from '@/utils/errorHandler';
import theme from '@/theme';

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState<React.ReactNode>(null);
  const [errorMessage, setErrorMessage] = useState('');

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
    setSuccessMessage('');
    setErrorMessage('');

    registerMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.status) {
          setSuccessMessage(
            <>
              {res.message} <strong>{res.data}</strong>. You can now{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  textDecoration: 'underline',
                  color: 'blue',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                login
              </Link>
              .
            </>,
          );
          reset();
        } else {
          setErrorMessage(res.message);
        }
      },
      onError: (error) => {
        setErrorMessage(extractErrorMessage(error));
      },
    });
  };

  return (
    <Box
      sx={{
        width: 800,
        mx: 'auto',
        mt: 5,
        p: 4,
        bgcolor: theme.palette.background.default,
        borderRadius: 2,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        fontWeight="bold"
        color={theme.palette.primary.main}
        textAlign="center"
      >
        Your Citizen Portal
      </Typography>

      {/* Online Registration Banner */}
      <Paper
        elevation={1}
        sx={{
          bgcolor: theme.palette.primary.main,
          p: 1,
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle1" color={theme.palette.background.default}>
          Online Registration
        </Typography>
      </Paper>

      {/* Success & Error Messages */}
      {successMessage && (
        <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
          {successMessage}
        </Typography>
      )}
      {errorMessage && (
        <Typography variant="body1" sx={{ color: theme.palette.error.main }}>
          {errorMessage}
        </Typography>
      )}

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
                label="Username"
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
                label="Email"
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
                label="First Name"
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
                label="Last Name"
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
                label="City"
                fullWidth
                error={!!errors.address?.city}
                helperText={errors.address?.city?.message}
              />
            )}
          />

          {/* Address: Street */}
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Street"
                fullWidth
                error={!!errors.address?.street}
                helperText={errors.address?.street?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* Address: Number */}
          <Controller
            name="address.number"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number"
                fullWidth
                error={!!errors.address?.number}
                helperText={errors.address?.number?.message}
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
                label="Postcode"
                fullWidth
                error={!!errors.address?.postcode}
                helperText={errors.address?.postcode?.message}
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
                label="Phone Number"
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
                label="SSN"
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
                label="Password"
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2, width: 300 }}
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterForm;
