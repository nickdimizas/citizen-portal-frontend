import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
  component?: React.ElementType;
}

const Sidebar = ({ component = 'aside' }: SidebarProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/users/me');
  };

  return (
    <Box
      component={component}
      sx={{
        width: 250,
        bgcolor: 'primary.main',
        height: '100%',
        p: 2,
        m: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Menu Items */}
      <Button variant="contained" color="secondary" size="small" onClick={handleProfileClick}>
        Profile
      </Button>
    </Box>
  );
};

export default Sidebar;
