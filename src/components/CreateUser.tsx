import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useCreateUser } from '@/hooks/useCreateUser';
import { createUserValidator, type CreateUserFormInputs } from '@/validators/userValidator';
import theme from '@/theme';
import { extractErrorMessage } from '@/utils/errorHandler';

const CreateUserComponent = () => {
  const { data: currentUser } = useCurrentUser();
  const createMutation = useCreateUser();

  const roleOptions: CreateUserFormInputs['role'][] = ['admin', 'employee', 'citizen'];

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
  } = useForm<CreateUserFormInputs>({
    resolver: zodResolver(createUserValidator),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phoneNumber: '',
      ssn: '',
      address: { city: '', street: '', number: '', postcode: '' },
      role: 'citizen', // default role
    },
  });

  const onSubmit = (data: CreateUserFormInputs) => {
    setSnackbar({ open: false, message: '', severity: 'success' });

    createMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.status) {
          setSnackbar({
            open: true,
            message: `User created successfully!`,
            severity: 'success',
          });
          reset();
        } else {
          setSnackbar({
            open: true,
            message: 'Something went wrong',
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
          <Typography variant="h6" fontWeight="bold" color={theme.palette.background.default}>
            Create User
          </Typography>
        </Paper>

        {/* FORM */}
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

            {/* Role dropdown visible only for admins */}
            {currentUser?.role === 'admin' && (
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Role"
                    select
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.role}
                    helperText={errors.role?.message}
                    slotProps={{
                      select: {
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              bgcolor: 'background.default',
                            },
                          },
                        },
                      },
                    }}
                  >
                    {roleOptions.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            )}
          </Box>

          {/* Submit button */}
          <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2, px: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending ? 'Creating...' : 'Create User'}
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
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateUserComponent;
