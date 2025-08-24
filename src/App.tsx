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
import HomePage from './pages/HomePage';
import UpdateCurrentUserPage from './pages/UpdateCurrentUserPage';

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

          {/* Protected routes that share DashboardLayout */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* /home */}
            <Route path="/home" element={<HomePage />} />

            {/* /users */}
            <Route path="/users">
              {/* default page under /users */}
              <Route index element={<UsersTablePage />} />

              {/* nested under /users/me */}
              <Route path="me">
                <Route index element={<ProfilePage />} />
                <Route path="password" element={<ChangePasswordPage />} />
                <Route path="edit" element={<UpdateCurrentUserPage />} />
              </Route>

              {/* /users/:id */}
              <Route path=":id" element={<UserProfileByIdPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
