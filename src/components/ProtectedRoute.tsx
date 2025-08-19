import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { setAuthenticated } from '@/store/authSlice';
import { useUserProfile } from '@/hooks/useCurrentUser';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { isLoading, error, data } = useUserProfile();

  useEffect(() => {
    if (data) {
      dispatch(setAuthenticated(true));
    }
  }, [data, dispatch]);

  if (isLoading) return <div>Loading...</div>;

  if (error) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
