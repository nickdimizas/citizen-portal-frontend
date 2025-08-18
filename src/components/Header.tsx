import { Box, Typography, Button } from '@mui/material';
import { useSelector } from 'react-redux';

import { useLogout } from '@/hooks/useLogout';
import type { RootState } from '@/store/store';

interface HeaderProps {
  component?: React.ElementType;
}

const Header = ({ component = 'header' }: HeaderProps) => {
  const username = useSelector((state: RootState) => state.user.userData?.username || '');
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Box
      component={component}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        bgcolor: 'primary.main',
        color: 'background.default',
        px: 3,
        py: 2,
        boxShadow: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Your Citizen Portal
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body1">{username}</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} size="small">
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
