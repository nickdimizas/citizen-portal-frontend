import { Box, Typography, Button, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

import { useLogout } from '@/hooks/useLogout';
import type { RootState } from '@/store/store';
import logo from '@/assets/logo.jpg';

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
        height: '8vh',
        minHeight: '70px',
        maxHeight: '120px',
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          component="img"
          src={logo}
          alt="Logo"
          sx={{
            width: 80,
            height: 'auto',
            objectFit: 'contain',
            boxShadow: 4,
          }}
        />

        <Typography variant="h6" fontWeight="bold">
          Citizen Portal
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography
          variant="body1"
          sx={{
            bgcolor: 'warning.main',
            color: 'background.default',
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          Welcome {username}
        </Typography>
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <PersonIcon />
        </Avatar>
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
