import { Box } from '@mui/material';

import LoginForm from '@/components/LoginForm';

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: '95vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: 'background.default',
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
