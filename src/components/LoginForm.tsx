import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField, Button, Typography, Link, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { loginValidator, type LoginFormInputs } from '@/validators/authValidators';
import { useLogin } from '@/hooks/useLogin';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginValidator),
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormInputs) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.status) {
          navigate('/users/me');
        }
      },
    });
  };

  return (
    <Box
      sx={{
        width: 450,
        mx: 'auto',
        mt: 10,
        p: 4,
        bgcolor: 'background.default',
        borderRadius: 2,
        boxShadow: 4,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary" sx={{ mb: 3 }}>
        Sign In to Your Acccount
      </Typography>

      {/* Username or Email Field */}
      <Controller
        name="usernameOrEmail"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Username or Email*"
            variant="outlined"
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
            type="password"
            variant="outlined"
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

      <Button type="submit" variant="contained" color="primary" fullWidth>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>

      <Typography variant="body2" textAlign="center">
        Don&apos;t have an account?{' '}
        <Link href="/register" underline="hover" color="secondary">
          Register
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
