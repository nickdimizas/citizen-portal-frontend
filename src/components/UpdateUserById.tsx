import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, TextField, Snackbar, Alert, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { updateUserValidator, type UpdateUserFormInputs } from '@/validators/userValidator';
import { useUpdateUserById } from '@/hooks/useUpdateUserById';
import { useGetUserById } from '@/hooks/useGetUserById';

type UpdateUserByIdProps = { id: string };

const UpdateUserById = ({ id }: UpdateUserByIdProps) => {
  const { data: user, isLoading } = useGetUserById(id);
  const updateUser = useUpdateUserById(id);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const defaultValues: UpdateUserFormInputs = {
    username: user?.username ?? '',
    email: user?.email ?? '',
    firstname: user?.firstname ?? '',
    lastname: user?.lastname ?? '',
    phoneNumber: user?.phoneNumber ?? '',
    ssn: user?.ssn ?? '',
    address: {
      city: user?.address?.city ?? '',
      street: user?.address?.street ?? '',
      number: user?.address?.number ?? '',
      postcode: user?.address?.postcode ?? '',
    },
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserFormInputs>({
    resolver: zodResolver(updateUserValidator),
    defaultValues,
  });

  useEffect(() => {
    if (user)
      reset({
        username: user.username,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        phoneNumber: user.phoneNumber,
        ssn: user.ssn,
        address: {
          city: user.address.city,
          street: user.address.street,
          number: user.address.number,
          postcode: user.address.postcode,
        },
      });
  }, [user, reset]);

  const onSubmit = (data: UpdateUserFormInputs) => {
    updateUser.mutate(data, {
      onSuccess: (updatedUser) => {
        setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
        reset(updatedUser);
      },
      onError: (error) => {
        setSnackbar({ open: true, message: error.message, severity: 'error' });
      },
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.default',
          width: 800,
          mx: 'auto',
          mt: 5,
          pb: 5,
          borderRadius: 2,
          boxShadow: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 3,
            bgcolor: 'primary.main',
            color: 'background.default',
            p: 2,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            boxShadow: 4,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Update Profile
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

          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2, px: 4 }}>
            {/* Submit Button */}
            <Button type="submit" variant="contained" color="secondary">
              Update
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Snackbar for success/error */}
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

export default UpdateUserById;
