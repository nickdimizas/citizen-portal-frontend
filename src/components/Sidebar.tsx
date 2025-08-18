import { Box } from '@mui/material';

interface SidebarProps {
  component?: React.ElementType;
}

const Sidebar = ({ component = 'aside' }: SidebarProps) => {
  return (
    <Box
      component={component}
      sx={{
        width: 200,
        bgcolor: 'background.default',
        height: '100vh',
        p: 2,
      }}
    >
      {/* Menu items will go here */}
      Sidebar
    </Box>
  );
};

export default Sidebar;
