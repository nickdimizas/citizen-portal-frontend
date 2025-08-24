import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { useCurrentUser } from '@/hooks/useCurrentUser';

import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  headerComponent?: React.ElementType;
  sidebarComponent?: React.ElementType;
  children?: React.ReactNode;
}

const DashboardLayout = ({ headerComponent, sidebarComponent }: DashboardLayoutProps) => {
  const { isLoading, error } = useCurrentUser();

  if (isLoading) return <p>Loading user...</p>;
  if (error) return <p>Failed to load user</p>;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '95vh', overflow: 'hidden' }}>
      <Header component={headerComponent} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar component={sidebarComponent} />
        <Box component="main" sx={{ flex: 1, p: 2, mt: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
