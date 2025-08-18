import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  headerComponent?: React.ElementType;
  sidebarComponent?: React.ElementType;
  children?: React.ReactNode;
}

const DashboardLayout = ({ headerComponent, sidebarComponent }: DashboardLayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header component={headerComponent} />
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Sidebar component={sidebarComponent} />
        <Box component="main" sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
