import { Box } from '@mui/material';

import RegisterForm from '@/components/RegisterForm';

const RegisterPage = () => {
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
      <RegisterForm />
    </Box>
  );
};

export default RegisterPage;
