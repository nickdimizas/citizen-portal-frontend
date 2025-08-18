import { Box, Typography } from '@mui/material';

const UserProfile = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 4,
        borderRadius: 2,
        minHeight: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" color="text.primary">
        User Profile Placeholder
      </Typography>
    </Box>
  );
};

export default UserProfile;
