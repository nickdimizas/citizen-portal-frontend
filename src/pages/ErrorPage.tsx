import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { status?: number; message?: string } | undefined;

  const status = state?.status || 500;
  const message = state?.message || 'An unexpected error occurred';

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      textAlign="center"
      gap={2}
    >
      <Typography variant="h2" color="error">
        {status}
      </Typography>
      <Typography variant="h5">{message}</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Box>
  );
};

export default ErrorPage;
