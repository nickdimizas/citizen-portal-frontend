import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { zodResolver } from '@hookform/resolvers/zod';

import { useChangePassword } from '@/hooks/useChangePassword';
import { changePasswordValidator, type ChangePasswordFormInputs } from '@/validators/userValidator';
import { extractErrorMessage } from '@/utils/errorHandler';

const ChangePasswordForm = () => {
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
  } = useForm<ChangePasswordFormInputs>({
    resolver: zodResolver(changePasswordValidator),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  const changePasswordMutation = useChangePassword();

  const onSubmit = (data: ChangePasswordFormInputs) => {
    changePasswordMutation.mutate(data, {
      onSuccess: (res) => {
        setSnackbar({
          open: true,
          message: res.message,
          severity: 'success',
        });
        reset();
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
          width: 500,
          mx: 'auto',
          bgcolor: 'background.default',
          borderRadius: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            bgcolor: 'primary.main',
            color: 'background.default',
            p: 2,
            textAlign: 'center',
            borderRadius: '8px 8px 0 0',
            boxShadow: 4,
          }}
        >
          <Typography variant="h6">Change Your Password</Typography>
        </Paper>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}
        >
          {/* Current Password */}
          <Controller
            name="currentPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Current Password*"
                placeholder="Enter current password"
                type="password"
                fullWidth
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
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

          {/* New Password */}
          <Controller
            name="newPassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="New Password*"
                placeholder="Enter new password"
                type="password"
                fullWidth
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={changePasswordMutation.isPending}
              sx={{ bgcolor: 'background.paper' }}
            >
              {changePasswordMutation.isPending ? 'Changing...' : 'Change Password'}
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

export default ChangePasswordForm;
