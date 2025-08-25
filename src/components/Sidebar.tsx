import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useCurrentUser } from '@/hooks/useCurrentUser';

interface SidebarProps {
  component?: React.ElementType;
}

const Sidebar = ({ component = 'aside' }: SidebarProps) => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const handleHomeClick = () => {
    navigate('/home');
  };

  const handleProfileClick = () => {
    navigate('/users/me');
  };

  const handleChangePasswordClick = () => {
    navigate('/users/me/password');
  };

  const handleUsersClick = () => {
    navigate('/users');
  };

  const handleCreateUserClick = () => {
    navigate('/users/create');
  };

  return (
    <Box
      component={component}
      sx={{
        width: 250,
        bgcolor: 'primary.main',
        p: 2,
        m: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {/* Menu Items */}
      <Button variant="contained" color="secondary" size="small" onClick={handleHomeClick}>
        Home
      </Button>
      <Button variant="contained" color="secondary" size="small" onClick={handleProfileClick}>
        Profile
      </Button>
      {(currentUser.data?.role === 'admin' || currentUser.data?.role === 'employee') && (
        <>
          <Button variant="contained" color="secondary" size="small" onClick={handleUsersClick}>
            Manage Users
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleCreateUserClick}
          >
            Create User
          </Button>
        </>
      )}
      <Button
        variant="contained"
        color="secondary"
        size="small"
        onClick={handleChangePasswordClick}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default Sidebar;
