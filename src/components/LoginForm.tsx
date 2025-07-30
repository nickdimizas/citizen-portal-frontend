import { Box, TextField, Button, Typography, Link, InputAdornment } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

const LoginForm = () => {
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
    >
      <Typography variant="h5" fontWeight="bold" textAlign="center" color="primary" sx={{ mb: 3 }}>
        Sign In to Your Acccount
      </Typography>

      <TextField
        label="Username or Email*"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Password*"
        type="password"
        variant="outlined"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon />
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="body2" textAlign="right" sx={{ mt: -1, mb: 2 }}>
        <Link href="/forgot-password" underline="hover" color="secondary">
          Forgot your password?
        </Link>
      </Typography>

      <Button variant="contained" color="primary" fullWidth>
        Login
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
