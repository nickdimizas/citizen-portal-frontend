import { Box } from '@mui/material';

import ChangePasswordForm from '@/components/ChangePasswordForm';

const ChangePasswordPage = () => {
  return (
    <Box
      sx={{
        mt: 8,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <ChangePasswordForm />
    </Box>
  );
};

export default ChangePasswordPage;
