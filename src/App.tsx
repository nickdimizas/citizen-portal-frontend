import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import LoginPage from '@/pages/LoginPage';
import theme from '@/theme';
import ChangePasswordPage from '@/pages/ChangePasswordPage';
import RegisterPage from '@/pages/RegisterPage';
import ProfilePage from '@/pages/ProfilePage';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

import UsersTablePage from './pages/UsersTablePage';
import UserProfileByIdPage from './pages/UserProfileByIdPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected routes under /users */}
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* default page under /users */}
            <Route index element={<UsersTablePage />} />
            {/* Nested routes rendered inside <Outlet /> of DashboardLayout */}
            <Route path="me" element={<ProfilePage />} />
            <Route path="me/password" element={<ChangePasswordPage />} />
            <Route path=":id" element={<UserProfileByIdPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
